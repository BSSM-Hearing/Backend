import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './entities/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { AuthService } from 'src/auth/service/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1y' },
    })
  ],
  controllers: [UserController],
  providers: [UserService, AuthService]
})
export class UserModule { }
