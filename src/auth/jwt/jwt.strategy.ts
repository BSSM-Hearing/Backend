import { Inject, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dtos/user.dto';
import { plainToClass } from '@nestjs/class-transformer';

const { SECRET_KEY } = process.env;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: SECRET_KEY,
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        const user = await this.getUser(payload.userId);
        return user;
    }

    private async getUser(id: number) {
        const user = await this.userRepository.findOneBy({userId: id});
        return plainToClass(UserDto, {
            ...user
        }, { excludeExtraneousValues: true });
    }
}