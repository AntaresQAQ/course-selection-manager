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
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class StudentRegisterInfo {
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
  @ApiModelProperty({
    isArray: true,
    type: StudentRegisterInfo,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => StudentRegisterInfo)
  readonly students: StudentRegisterInfo[];
}
