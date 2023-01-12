import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator';

export class SendDialogRq {

    @IsNumber()
    @ApiProperty()
    hash: number; 

    @IsString()
    @ApiProperty()
    content!: string;

}