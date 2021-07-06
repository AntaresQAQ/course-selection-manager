import { ApiProperty } from '@nestjs/swagger';
import { IsUsername } from '@/common/validators';
import { IsString, Length } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty()
  @IsUsername()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @Length(6, 32)
  readonly password: string;
}
