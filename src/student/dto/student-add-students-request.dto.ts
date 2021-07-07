import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class StudentRegisterInfoDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty()
  @IsString()
  @Length(1, 30)
  readonly name: string;

  @ApiProperty()
  @IsString()
  @Length(1, 30)
  readonly major: string;

  @ApiProperty()
  @IsString()
  @Length(6, 32)
  readonly password: string;
}

export class StudentAddStudentsRequestDto {
  @ApiProperty({
    isArray: true,
    type: StudentRegisterInfoDto,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => StudentRegisterInfoDto)
  readonly students: StudentRegisterInfoDto[];
}
