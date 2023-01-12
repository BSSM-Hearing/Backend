import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ScoreModule } from './score/score.module';
import { AlarmModule } from './alarm/alarm.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      timezone: 'Z',
      entities: [__dirname + '/**/entities/*.entity.{js,ts}']
    }),
    AuthModule, 
    UserModule, ScoreModule, AlarmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
