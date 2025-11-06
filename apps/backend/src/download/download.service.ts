import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { lastValueFrom } from 'rxjs';
import { CreateDownloadDto } from './dto/create-download.dto';

@Injectable()
export class DownloadService {
  private readonly logger = new Logger(DownloadService.name);

  constructor(private readonly http: HttpService, private readonly configService: ConfigService) {}

  async createDownload(payload: CreateDownloadDto) {
    const baseUrl = this.configService.get<string>('cobaltApiUrl');
    const endpoint = new URL('/api/json', baseUrl).toString();

    try {
      const response = await lastValueFrom(
        this.http.post(endpoint, {
          url: payload.url,
          downloadMode: payload.audioOnly ? 'audio' : 'auto',
          format: payload.format
        })
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`Cobalt API error: ${error.message}`, error.stack);
        throw new ServiceUnavailableException('Failed to reach the upstream Cobalt API');
      }

      this.logger.error('Unexpected download error', (error as Error).stack);
      throw new InternalServerErrorException('Unexpected download error');
    }
  }
}
