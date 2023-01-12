import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator';

export class CheckAlarmRq {

    @IsNumber()
    @ApiProperty()
    alarmId!: number;

}