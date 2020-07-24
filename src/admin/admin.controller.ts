import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import  Admin  from "../entity/Admin"

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
    @Get("/testFindAll")
    async findAll(): Promise<Admin[]> {
      let admins = await this.adminService.findAll();
      return admins;
    }
}
