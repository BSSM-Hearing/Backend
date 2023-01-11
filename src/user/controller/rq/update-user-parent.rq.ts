import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNumber } from 'class-validator'

export class UpdateUserParentRq {
    @IsNumber()
    @ApiProperty()
    parentId!: number
}