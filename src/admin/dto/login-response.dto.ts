import { ApiProperty } from '@nestjs/swagger';
import { SessionInfoResponseDto } from '@/main/dto/session-info-response.dto';

export enum LoginResponseError {
  ALREADY_LOGGED = 'ALREADY_LOGGED',
  ERROR_USERNAME = 'ERROR_USERNAME',
  ERROR_PASSWORD = 'ERROR_PASSWORD',
}

export class LoginResponseDto {
  @ApiProperty()
  error?: LoginResponseError;

  @ApiProperty()
  sessionInfo?: SessionInfoResponseDto;
}
