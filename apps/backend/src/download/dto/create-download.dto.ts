import { IsBoolean, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateDownloadDto {
  @IsUrl({ protocols: ['http', 'https'] })
  url!: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  format?: string;

  @IsOptional()
  @IsBoolean()
  audioOnly?: boolean;
}
