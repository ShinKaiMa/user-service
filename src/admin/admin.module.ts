import { Module } from '@nestjs/common';
import { AdminAuthGuard }  from "../admin-auth.guard";
import { AdminRepository } from "./admin.repository";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
    controllers: [AdminController],
    providers: [AdminService, AdminAuthGuard, AdminRepository],
})
export class AdminModule {}
