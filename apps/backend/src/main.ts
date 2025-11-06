import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: configService.get<string>('FRONTEND_ORIGIN') ?? '*',
    credentials: true
  });

  const port = configService.get<number>('PORT', 3001);
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`Backend is running on http://localhost:${port}`);
}

bootstrap();
