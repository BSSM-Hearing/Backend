import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/auth/dtos/user.dto';
import { Repository } from 'typeorm';
import { plainToClass } from '@nestjs/class-transformer';
import { Dialog } from '../entities/dialog.entity';
import { SendDialogRq } from '../controller/rq/send-dialog.rq';

@Injectable()
export class DialogService {
  constructor(
    @InjectRepository(Dialog) private dialogRepository: Repository<Dialog>,
  ) { }

  async SendDialog(user: UserDto, rq: SendDialogRq) {
    const { userId } = user;
    await this.dialogRepository.save(plainToClass(Dialog, {
      ...rq,
      userId: userId
    }));
  }

}
