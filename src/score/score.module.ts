import { Module } from '@nestjs/common';
import { ScoreService } from './service/score.service';
import { ScoreController } from './controller/score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score])
  ],
  controllers: [ScoreController],
  providers: [ScoreService]
})
export class ScoreModule { }
