import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { json } from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import ConnectRedis from 'connect-redis';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function initialize(): Promise<
  [configService: ConfigService, app: NestExpressApplication]
> {
  // create nest express application
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    ...(process.env.NODE_ENV === 'production'
      ? { logger: ['warn', 'error'] }
      : {}),
  });
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.use(json({ limit: '1024mb' }));

  // use express-session
  const redisStore = ConnectRedis(session);
  app.use(
    session({
      secret: configService.config.secret,
      resave: false,
      saveUninitialized: false,
      store: new redisStore({
        client: new Redis(configService.config.redis),
      }),
    }),
  );

  // use swagger
  const options = new DocumentBuilder()
    .setTitle('course-selection-manager')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  return [configService, app];
}

async function bootstrap() {
  const [configService, app] = await initialize();
  await app.listen(
    configService.config.server.port,
    configService.config.server.hostname,
  );
  Logger.log(
    `course-selection-manager is listening on ${configService.config.server.hostname}:${configService.config.server.port}`,
    'Bootstrap',
  );
}

bootstrap().catch((err) => {
  console.error(err);
  console.error('Error bootstrapping the application, exiting...');
  process.exit(1);
});
