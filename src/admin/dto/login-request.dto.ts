import { ApiProperty } from '@nestjs/swagger';
import { IsUsername } from '@/common/validators';
import { IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty()
  @IsUsername()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
