import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cobalt Downloader API')
    .setDescription('API documentation for the Cobalt Downloader NestJS backend.')
    .setVersion(process.env.npm_package_version ?? '0.0.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'list',
      displayRequestDuration: true,
    },
  });

  const port = parseInt(process.env.PORT ?? '', 10) || 3001;
  await app.listen(port);

  const url = await app.getUrl();
  // eslint-disable-next-line no-console
  console.log(`Nest backend listening on ${url}`);
  // eslint-disable-next-line no-console
  console.log(`Swagger docs available at ${url.replace(/\/?$/, '')}/docs`);
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap Nest application', error);
  process.exit(1);
});
