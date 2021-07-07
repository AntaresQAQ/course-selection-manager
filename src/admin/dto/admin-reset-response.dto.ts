import { ApiProperty } from '@nestjs/swagger';

export enum AdminResetResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  ERROR_PASSWORD = 'ERROR_PASSWORD',
}

export class AdminResetResponseDto {
  @ApiProperty()
  error?: AdminResetResponseError;

  @ApiProperty()
  result?: 'SUCCEED';
}
