import { Module } from '@nestjs/common';
import { AlarmService } from './service/alarm.service';
import { AlarmController } from './controller/alarm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alarm } from './entities/alarm.entity';
import { AlarmGateway } from './alarm.gateway';
import { WSAuthUtil } from 'src/auth/WS-auth';
import { User } from 'src/user/entities/user.entity';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Alarm, User]),
        JwtModule
    ],
    controllers: [AlarmController],
    providers: [AlarmService, AlarmGateway, WSAuthUtil]
})
export class AlarmModule { }
