import { AdminAuthGuard } from './admin-auth.guard';

describe('AdminAuthGuard', () => {
  it('should be defined', () => {
    expect(new AdminAuthGuard()).toBeDefined();
  });

  it('should be defined', () => {
    let g = new AdminAuthGuard();
    g.canActivate
    expect(new AdminAuthGuard().canActivate)
  });
});
