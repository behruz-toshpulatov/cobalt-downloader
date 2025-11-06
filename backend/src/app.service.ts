import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import appConfig from './config/app.config';
import { AppMetadataDto } from './dto/app-metadata.dto';

@Injectable()
export class AppService {
  constructor(@Inject(appConfig.KEY) private readonly config: ConfigType<typeof appConfig>) {}

  getMetadata(): AppMetadataDto {
    return {
      name: this.config.name,
      description: this.config.description,
      version: this.config.version,
      docsPath: this.config.docsPath,
    };
  }
}
