import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {createConnection} from "typeorm";
import { initialAdminConfig, initAdmin } from "./config/admin.config";

async function bootstrap() {
  // await createConnection();
  const app = await NestFactory.create(AppModule);
  await initAdmin(initialAdminConfig);
  await app.listen(3000);
}
bootstrap();
