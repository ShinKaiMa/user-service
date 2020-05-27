import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { AdminController } from "./admin.controller"
import { AdminRepository } from "./admin.repository"

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService, AdminRepository],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
