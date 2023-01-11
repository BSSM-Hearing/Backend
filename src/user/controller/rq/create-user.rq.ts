import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Transform } from 'class-transformer';
import { IsIn, IsString, Matches, MaxLength, MinLength, IsEmail, IsOptional } from 'class-validator'
import { UserRole } from 'src/common/enums/UserRole';

export class CreateUserRq {

    @Transform(params => params.value.trim())
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    @ApiProperty()
    nickname!: string;

    @IsEmail()
    @ApiProperty()
    email!: string;

    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    @ApiProperty()
    password!: string;

    @IsIn(["guardian", "disabled"])
    @ApiProperty()
    role!: UserRole

    @IsOptional()
    @ApiProperty()
    parentUserId?: number

}