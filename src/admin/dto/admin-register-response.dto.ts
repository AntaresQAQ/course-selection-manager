import { ApiProperty } from '@nestjs/swagger';
import { GetSessionInfoResponseDto } from '@/main/dto/get-session-info-response.dto';

export enum AdminRegisterResponseError {
  NOT_ALLOW_REGISTER = 'NOT_ALLOW_REGISTER',
  ALREADY_LOGGED = 'ALREADY_LOGGED',
  USERNAME_ALREADY_USED = 'USERNAME_ALREADY_USED',
}

export class AdminRegisterResponseDto {
  @ApiProperty()
  error?: AdminRegisterResponseError;

  @ApiProperty()
  sessionInfo?: GetSessionInfoResponseDto;
}
