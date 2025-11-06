import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AppMetadataDto } from './dto/app-metadata.dto';

@ApiTags('metadata')
@Controller('meta')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve service metadata for the frontend application.' })
  @ApiOkResponse({ type: AppMetadataDto })
  getMetadata(): AppMetadataDto {
    return this.appService.getMetadata();
  }
}
