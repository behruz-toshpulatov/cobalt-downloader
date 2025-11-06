import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

type HealthResponse = {
  status: 'ok';
  timestamp: string;
};

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint used by uptime monitors.' })
  @ApiOkResponse({ description: 'The service is operating normally.' })
  getHealth(): HealthResponse {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
