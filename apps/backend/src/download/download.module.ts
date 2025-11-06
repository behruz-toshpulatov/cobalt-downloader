import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DownloadController } from './download.controller';
import { DownloadService } from './download.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 15000
    })
  ],
  controllers: [DownloadController],
  providers: [DownloadService]
})
export class DownloadModule {}
