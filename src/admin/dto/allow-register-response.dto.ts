import { ApiProperty } from '@nestjs/swagger';

export enum AllowRegisterResponseError {
  ALREADY_LOGGED = 'ALREADY_LOGGED',
}

export class AllowRegisterResponseDto {
  @ApiProperty()
  error?: AllowRegisterResponseError;

  @ApiProperty()
  allow?: boolean;
}
