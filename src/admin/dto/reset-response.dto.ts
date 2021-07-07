import { ApiProperty } from '@nestjs/swagger';

export enum ResetResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  ERROR_PASSWORD = 'ERROR_PASSWORD',
}

export class ResetResponseDto {
  @ApiProperty()
  error?: ResetResponseError;

  @ApiProperty()
  result?: 'SUCCEED';
}
