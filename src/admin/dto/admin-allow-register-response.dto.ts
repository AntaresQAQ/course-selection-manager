import { ApiProperty } from '@nestjs/swagger';

export enum AdminAllowRegisterResponseError {
  ALREADY_LOGGED = 'ALREADY_LOGGED',
}

export class AdminAllowRegisterResponseDto {
  @ApiProperty()
  error?: AdminAllowRegisterResponseError;

  @ApiProperty()
  allow?: boolean;
}
