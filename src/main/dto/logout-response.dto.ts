import { ApiProperty } from '@nestjs/swagger';

export enum LogoutResponseError {
  NOT_LOGGED = 'NOT_LOGGED',
}

export class LogoutResponseDto {
  @ApiProperty()
  error?: LogoutResponseError;

  @ApiProperty()
  result?: 'SUCCEED';
}
