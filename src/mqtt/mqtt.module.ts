import { Module } from '@nestjs/common';
import { MqttService } from './service/mqtt.service';
import { MqttController } from './controller/mqtt.controller';

@Module({
  providers: [MqttService],
  controllers: [MqttController]
})
export class MqttModule {}
