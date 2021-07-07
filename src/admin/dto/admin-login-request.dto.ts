import { ApiProperty } from '@nestjs/swagger';
import { IsUsername } from '@/common/validators';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminLoginRequestDto {
  @ApiProperty()
  @IsUsername()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
