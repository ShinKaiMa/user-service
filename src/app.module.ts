import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import Member from "./entity/Member";
import Admin from "./entity/Admin";
import Authority from "./entity/Authority";
import { AdminAuthGuard }  from "./admin-auth.guard";
import { AdminRepository } from "./admin/admin.repository";
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "user-service",
      // autoLoadEntities: true,
      entities:[
        Authority,
        Admin,
        Member
      ],
      synchronize: true,
      logging: false,
      retryAttempts: 10,
      retryDelay: 10000
    }),
    AdminModule,
  ],
  providers: [AdminAuthGuard, AdminService, AdminRepository],
})
export class AppModule {}
