import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserRq } from '../controller/rq/create-user.rq';
import { User } from '../entities/user.entity';
import { plainToClass } from '@nestjs/class-transformer';
import { LoginRq } from '../controller/rq/login.rq';
import { AuthService } from 'src/auth/service/auth.service';
import { UserDto } from 'src/auth/dtos/user.dto';
import { UpdateUserParentRq } from '../controller/rq/update-user-parent.rq';
import * as ApiException from 'src/common/exceptions/ApiException';

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
            parentId: parentUserId ?? null
        }));
    }

    async HashPassword(password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }

    async Login(rq: LoginRq) {
        const { email, password } = rq;
        const user = await this.userRepository.findOneBy({ email: email });
        if (!user) throw new NotFoundException(ApiException.NOT_FOUND_EMAIL);
        const hashedPassword = user.password;
        await this.VerifyPassword(password, hashedPassword);
        return this.authService.getToken(user.userId, email);
    }

    private async VerifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new NotAcceptableException(ApiException.NOT_ACCEPTABLE_PASSWORD);
        }
    }

    async UpdateUserParent(user: UserDto, rq: UpdateUserParentRq) {
        const { parentId } = rq;
        const parent = await this.userRepository.findOneBy({ userId: parentId });
        if (!parent) throw new NotFoundException(ApiException.NOT_FOUND_EMAIL);
        await this.userRepository.createQueryBuilder()
            .update(User)
            .set({
                parentId: rq.parentId,
            })
            .where('userId = :userId', { userId: user.userId })
            .execute();
    }



}
