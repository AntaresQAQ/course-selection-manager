import { ApiProperty } from '@nestjs/swagger';

export class AdminInfo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;
}
