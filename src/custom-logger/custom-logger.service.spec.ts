import { Test, TestingModule } from '@nestjs/testing';
import { CustomLogger } from './custom-logger.service';

describe('CustomLoggerService', () => {
  let service: CustomLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomLogger],
    }).compile();

    service = module.get<CustomLogger>(CustomLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
