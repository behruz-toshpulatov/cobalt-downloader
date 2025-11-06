import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateDownloadDto } from './dto/create-download.dto';
import { DownloadService } from './download.service';

@Controller('downloads')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() dto: CreateDownloadDto) {
    return this.downloadService.createDownload(dto);
  }
}
