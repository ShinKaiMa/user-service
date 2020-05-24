import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AppModule {}
