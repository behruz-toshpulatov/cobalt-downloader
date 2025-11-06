import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMessage() {
    return {
      name: 'Cobalt Downloader API',
      version: process.env.npm_package_version ?? '0.0.0',
      description: 'NestJS backend for the Cobalt Downloader project.',
    };
  }
}
