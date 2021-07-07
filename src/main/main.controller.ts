import { Controller, Get, Session } from '@nestjs/common';

import { MainService } from './main.service';

import { GetSessionInfoResponseDto } from './dto/get-session-info-response.dto';
import {
  LogoutResponseDto,
  LogoutResponseError,
} from './dto/logout-response.dto';

@Controller()
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get('getSessionInfo')
  async getSessionInfo(
    @Session() session: Record<string, any>,
  ): Promise<GetSessionInfoResponseDto> {
    if (!session.uid || !['admin', 'student'].includes(session.type)) {
      session.type = null;
      session.uid = null;
      return {
        type: null,
        info: null,
      };
    }
    return this.mainService.getSessionInfo(session.type, session.uid);
  }

  @Get('logout')
  async logout(
    @Session() session: Record<string, any>,
  ): Promise<LogoutResponseDto> {
    if (!session.uid && !session.type) {
      session.uid = null;
      session.type = null;
      return { error: LogoutResponseError.NOT_LOGGED };
    }
    session.uid = null;
    session.type = null;
    return { result: 'SUCCEED' };
  }
}
