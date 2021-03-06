import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { json } from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import ConnectRedis from 'connect-redis';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    ...(process.env.NODE_ENV === 'production'
      ? { logger: ['warn', 'error'] }
      : {}),
  });
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(json({ limit: '1024mb' }));

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

  const options = new DocumentBuilder()
    .setTitle('course-selection-manager')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

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
