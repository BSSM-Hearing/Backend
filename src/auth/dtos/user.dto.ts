import { Expose } from "@nestjs/class-transformer";
import { User } from "src/user/entities/user.entity";

export class UserDto {

    @Expose()
    userId: number;

    @Expose()
    nickname: string;

    @Expose()
    email: string;

    @Expose()
    totalWorkingHour: number;

}