import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class WSAuthUtil {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    private clients: {
        [index: string]: {
            socket: Socket,
            user: User
        }
    } = {};

    async authClient(client: Socket) {
        if (this.clients[client.id]) {
            return this.clients[client.id].user;
        }
        const token = client.request.url.slice(18).split('&')[0];
        try {
            const result = this.jwtService.verify(token, {
                secret: process.env.SECRET_KEY
            });
            return await this.getUser(result.id);
        } catch (error) {
            return false;
        }
    }

    private async getUser(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                userId: id
            }
        });
        return user;
    }

}
