import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
export class Token {
    @ApiProperty()
    token: string
}