import { ApiProperty } from '@nestjs/swagger';
import { GetSessionInfoResponseDto } from '@/main/dto';

export enum AdminLoginResponseError {
  ALREADY_LOGGED = 'ALREADY_LOGGED',
  ERROR_USERNAME = 'ERROR_USERNAME',
  ERROR_PASSWORD = 'ERROR_PASSWORD',
}

export class AdminLoginResponseDto {
  @ApiProperty({ enum: AdminLoginResponseError })
  error?: AdminLoginResponseError;

  @ApiProperty()
  sessionInfo?: GetSessionInfoResponseDto;
}
