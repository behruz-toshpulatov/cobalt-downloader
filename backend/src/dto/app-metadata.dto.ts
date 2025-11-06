import { ApiProperty } from '@nestjs/swagger';

export class AppMetadataDto {
  @ApiProperty({ example: 'Cobalt Downloader API' })
  name!: string;

  @ApiProperty({ example: 'NestJS backend powering the Cobalt Downloader platform.' })
  description!: string;

  @ApiProperty({ example: '1.0.0' })
  version!: string;

  @ApiProperty({ example: '/docs', description: 'Relative path to the generated Swagger UI.' })
  docsPath!: string;
}
