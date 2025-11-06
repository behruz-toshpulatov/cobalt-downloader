import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME ?? 'Cobalt Downloader API',
  description:
    process.env.APP_DESCRIPTION ?? 'NestJS backend powering the Cobalt Downloader platform.',
  version: process.env.npm_package_version ?? '0.0.0',
  docsPath: process.env.APP_DOCS_PATH ?? '/docs',
}));
