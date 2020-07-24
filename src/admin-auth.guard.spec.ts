import { AdminAuthGuard } from './admin-auth.guard';
import { Test, TestingModule } from '@nestjs/testing';
// import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
// import { AdminRepository } from './admin/admin.repository';

describe('AdminAuthGuard', () => {
  let guard: AdminAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports:[AdminModule],
      providers: [AdminAuthGuard, AdminService],
    }).compile();

    guard = module.get<AdminAuthGuard>(AdminAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  // it('should be defined', () => {
  //   expect(guard.canActivate()).toBeDefined();
  // });

  // it('should be defined', () => {
  //   let g = new AdminAuthGuard();
  //   g.canActivate
  //   expect(new AdminAuthGuard().canActivate)
  // });
});
