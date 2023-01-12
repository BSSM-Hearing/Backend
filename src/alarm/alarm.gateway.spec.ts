import { Test, TestingModule } from '@nestjs/testing';
import { AlarmGateway } from './alarm.gateway';

describe('AlarmGateway', () => {
  let gateway: AlarmGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlarmGateway],
    }).compile();

    gateway = module.get<AlarmGateway>(AlarmGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
