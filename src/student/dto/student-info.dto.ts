import { ApiProperty } from '@nestjs/swagger';

export class StudentInfo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
