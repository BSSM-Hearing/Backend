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
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req?.cookies?.token;
                }
            ]),
            secretOrKey: SECRET_KEY,
            passReqToCallback: true,
        });
    }

    async validate(req: Request) {
        const token = await this.jwtService.verify(req?.cookies?.token, {
            secret: SECRET_KEY,
        });
        if (token === undefined) {
            throw new UnauthorizedException();
        }
        const user = await this.getUser(token.userId);
        return user;
    }

    private async getUser(id: number) {
        const user = await this.userRepository.findOneBy({userId: id});
        return plainToClass(UserDto, {
            ...user
        }, { excludeExtraneousValues: true });
    }
}