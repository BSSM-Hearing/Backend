import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator';

export class SendDialogRq {

    @IsString()
    @ApiProperty()
    hash: string; 

    @IsString()
    @ApiProperty()
    content!: string;

}