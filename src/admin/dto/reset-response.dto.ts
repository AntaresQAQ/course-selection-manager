import { ApiProperty } from '@nestjs/swagger';

export enum ResetResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  ERROR_PASSWORD = 'ERROR_PASSWORD',
}

export class ResetResponseDto {
  @ApiProperty()
  error?: ResetResponseError;

  @ApiProperty()
  result?: 'SUCCEED';
}
