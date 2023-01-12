import { Injectable } from '@nestjs/common';
import { plainToClass } from '@nestjs/class-transformer';
import { python } from 'compile-run';
import { MQTT_PYTHON_CODE } from './mqttPythonCode';

@Injectable()
export class MqttService {

    async MqttConnect() {
        const code = MQTT_PYTHON_CODE;
        return await this.Complie(code);
    }

    async Complie(code: string) {
		const result = await this.RunCode(code);
		// const adjustedStdout = this.AdjustStdout(result.stdout);
        return {
            ...result,
            stdout: result.stdout,
            stderr: result.stderr,
            // byte to megabyte
            memoryUsage: result.memoryUsage / 125000,
        }
	}

    private async RunCode(code: string) {
        const utf8EncodingSetting = "import sys\nimport io\nsys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')\nsys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')\n";
        return python.runSource(utf8EncodingSetting + code, { 
            stdin: "", 
        }, (err, result) => {
            return result;
        });
    }

}
