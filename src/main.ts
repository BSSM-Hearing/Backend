import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/common/utils/';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );
  app.setGlobalPrefix('api');
  setupSwagger(app);
  await app.listen(process.env.SERVER_PORT, '0.0.0.0');
}
bootstrap();
  