import { Module } from '@nestjs/common';
import { DialogService } from './service/dialog.service';
import { DialogController } from './controller/dialog.controller';
import { Dialog } from './entities/dialog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Dialog])],
  providers: [DialogService],
  controllers: [DialogController]
})
export class DialogModule {}
