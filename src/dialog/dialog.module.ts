import { Module } from '@nestjs/common';
import { DialogService } from './dialog.service';
import { DialogController } from './dialog.controller';

@Module({
  providers: [DialogService],
  controllers: [DialogController]
})
export class DialogModule {}
