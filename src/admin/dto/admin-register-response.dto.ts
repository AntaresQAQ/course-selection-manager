import { ApiProperty } from '@nestjs/swagger';
import { GetSessionInfoResponseDto } from '@/main/dto';

export enum AdminRegisterResponseError {
  NOT_ALLOW_REGISTER = 'NOT_ALLOW_REGISTER',
  ALREADY_LOGGED = 'ALREADY_LOGGED',
  USERNAME_ALREADY_USED = 'USERNAME_ALREADY_USED',
}

export class AdminRegisterResponseDto {
  @ApiProperty({ enum: AdminRegisterResponseError })
  error?: AdminRegisterResponseError;

  @ApiProperty({ type: AdminRegisterResponseDto })
  sessionInfo?: GetSessionInfoResponseDto;
}
