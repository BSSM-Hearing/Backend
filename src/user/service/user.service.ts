import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserRq } from '../controller/rq/create-user.rq';
import { User } from '../entities/user.entity';
import { plainToClass } from '@nestjs/class-transformer';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async CreateUser(rq: CreateUserRq) {
        const { password } = rq;
        const hashedPassword = await this.HashPassword(password);
        await this.SaveUser({
            ...rq,
            password: hashedPassword
        });
    }

    async SaveUser(rq: CreateUserRq) {
        const { parentUserId } = rq;
        await this.userRepository.save(plainToClass(User, {
            ...rq,
            parentId: parentUserId
        }));
    }

    async HashPassword(password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }

}
