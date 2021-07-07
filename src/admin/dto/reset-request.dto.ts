import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly currentPassword: string;

  @ApiProperty()
  @IsString()
  @Length(6, 32)
  readonly newPassword: string;
}
