import { Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger'

export class GetTodayDialogRs {

    @Expose()
    @ApiProperty()
    todayCnt: number; 

    @Expose()
    @ApiProperty()
    dialogPercent: string;

}