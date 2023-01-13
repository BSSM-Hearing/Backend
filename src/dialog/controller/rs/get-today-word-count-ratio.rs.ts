import { Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger'

export class GetTodayWordCountRatioRs {

    @ApiProperty()
    "0to3": string; 

    @ApiProperty()
    "4to7": string;
    
    @ApiProperty()
    "7to10": string;

    @ApiProperty()
    "10to13": string;

    @ApiProperty()
    "13to16": string;

}