import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class StudentResetRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly currentPassword?: string;

  @ApiProperty()
  @IsString()
  @Length(6, 32)
  readonly newPassword: string;
}
