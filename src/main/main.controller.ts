import { Controller, Get, Session } from '@nestjs/common';

import { SessionInfoResponseDto } from '@/main/dto/session-info-response.dto';
import { MainService } from '@/main/main.service';

@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get('sessionInfo')
  async getSessionInfo(
    @Session() session: Record<string, any>,
  ): Promise<SessionInfoResponseDto> {
    if (!session.sid || !['admin', 'student'].includes(session.type)) {
      session.type = null;
      session.sid = null;
      return {
        type: null,
        info: null,
      };
    }
    return this.mainService.getSessionInfo(session.type, session.sid);
  }
}
