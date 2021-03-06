import { Module } from '@nestjs/common';
import { AdminAuthGuard }  from "../admin-auth.guard";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import Admin from '../entity/Admin'

@Module({
    imports: [TypeOrmModule.forFeature([Admin])],
    controllers: [AdminController],
    providers: [AdminService, AdminAuthGuard],
})
export class AdminModule {}
