import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  const port = parseInt(process.env.PORT ?? '', 10) || 3001;
  await app.listen(port);

  const url = await app.getUrl();
  // eslint-disable-next-line no-console
  console.log(`Nest backend listening on ${url}`);
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap Nest application', error);
  process.exit(1);
});
