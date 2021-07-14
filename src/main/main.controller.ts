import { Controller, Get, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MainService } from './main.service';

import { GetSessionInfoResponseDto } from './dto';
import {
  LogoutResponseDto,
  LogoutResponseError,
} from './dto/logout-response.dto';

@ApiTags('Main')
@Controller()
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get('getSessionInfo')
  @ApiOperation({
    summary: "A JSON request to get current user's session info",
    description: "Don't need login session",
  })
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
  @ApiOperation({
    summary: 'A request to logout account',
    description: 'Must logged in',
  })
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
