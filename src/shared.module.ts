import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';

const sharedModules = [ConfigModule];

@Global()
@Module({
  imports: [...sharedModules],
  exports: [...sharedModules],
})
export class SharedModule {}
