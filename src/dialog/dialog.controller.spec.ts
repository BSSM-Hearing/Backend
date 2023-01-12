import { Test, TestingModule } from '@nestjs/testing';
import { DialogController } from './dialog.controller';

describe('DialogController', () => {
  let controller: DialogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DialogController],
    }).compile();

    controller = module.get<DialogController>(DialogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
