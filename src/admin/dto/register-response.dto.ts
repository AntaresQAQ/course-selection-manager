import { ApiProperty } from '@nestjs/swagger';
import { AdminInfo } from './admin-info.dto';

export enum RegisterResponseError {
  NOT_ALLOW_REGISTER = 'NOT_ALLOW_REGISTER',
  ALREADY_LOGGED = 'ALREADY_LOGGED',
  USERNAME_ALREADY_USED = 'USERNAME_ALREADY_USED',
}

export class RegisterResponseDto {
  @ApiProperty()
  error?: RegisterResponseError;

  @ApiProperty()
  info?: AdminInfo;
}
