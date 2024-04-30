import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: false }));

  // Cors
  app.enableCors({
    origin: 'http://localhost:3001', // Quais IP podem acessar
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Quais métodos podem utilizar
    allowedHeaders: 'Content-Type, Accept', // Quais headers podem enviar
  });
  const port = app.get(ConfigService).get('PORT') || 3000;
  await app.listen(3000);
}
bootstrap();
