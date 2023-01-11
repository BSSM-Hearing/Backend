import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserRq } from '../controller/rq/create-user.rq';
import { User } from '../entities/user.entity';
import { plainToClass } from '@nestjs/class-transformer';
import { LoginRq } from '../controller/rq/login.rq';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly authService: AuthService
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

    async Login(rs: Response, rq: LoginRq) {
        const { email, password } = rq;
        const user = await this.userRepository.findOneBy({ email: email });
        if (!user) throw new NotFoundException("유저 이메일을 찾을 수 없습니다.");
        const hashedPassword = user.password;
        await this.VerifyPassword(password, hashedPassword);
        return this.authService.getToken(rs, user.userId, email);
    }

    private async VerifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new NotAcceptableException("패스워드가 맞지 않습니다.");
        }
    }

}
