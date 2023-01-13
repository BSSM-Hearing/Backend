import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ScoreModule } from './score/score.module';
import { AlarmModule } from './alarm/alarm.module';
import { DialogModule } from './dialog/dialog.module';
import { typeormConfig } from './common/config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    UserModule,
    ScoreModule,
    AlarmModule,
    DialogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
