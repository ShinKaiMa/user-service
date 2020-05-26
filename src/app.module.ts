import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import Member from "./entity/Member"
import Admin from "./entity/Admin"
import Authority from "./entity/Authority"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "ec-user-services",
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      retryAttempts: 10,
      retryDelay: 10000
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AppModule {}
