import { ApiProperty } from '@nestjs/swagger';
import { GetSessionInfoResponseDto } from '@/main/dto';

export enum StudentLoginResponseError {
  ALREADY_LOGGED = 'ALREADY_LOGGED',
  ERROR_STUDENT_ID = 'ERROR_STUDENT_ID',
  ERROR_PASSWORD = 'ERROR_PASSWORD',
}

export class StudentLoginResponseDto {
  @ApiProperty({ enum: StudentLoginResponseError })
  error?: StudentLoginResponseError;

  @ApiProperty({ type: GetSessionInfoResponseDto })
  sessionInfo?: GetSessionInfoResponseDto;
}
