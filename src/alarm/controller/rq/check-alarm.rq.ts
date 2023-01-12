import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNumber } from 'class-validator';
import { Alarm } from 'src/alarm/entities/alarm.entity';

export class CheckAlarmRq {

    @IsNumber()
    @ApiProperty()
    alarmId!: number;

}