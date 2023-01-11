import { Expose } from "@nestjs/class-transformer";
import { UserRole } from "src/common/enums/UserRole";
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class UserDto {

    @Expose()
    @ApiProperty()
    userId: number;

    @Expose()
    @ApiProperty()
    nickname: string;
    
    @Expose()
    @ApiProperty()
    email: string;
    
    @Expose()
    @ApiProperty()
    role: UserRole;
    
    @Expose()
    @ApiProperty()
    parentId: number;

}