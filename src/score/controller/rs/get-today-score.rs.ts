import { Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger'

export class GetTodayScoreRs {

    @Expose()
    @ApiProperty()
    todayScore: number; 

    @Expose()
    @ApiProperty()
    scorePercent: string;

}