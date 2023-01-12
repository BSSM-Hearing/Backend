import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
const { SECRET_KEY } = process.env;

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async getToken(userId: number, email: string) {
        const payload = { userId: userId, email: email };

        const token = this.jwtService.sign(payload, {
            secret: SECRET_KEY,
            algorithm: 'HS256',
            expiresIn: '2h'
        });

        return {
            token
        }
    }
}
