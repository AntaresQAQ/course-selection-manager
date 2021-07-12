import { forwardRef, Module } from '@nestjs/common';

import { MainController } from './main.controller';
import { MainService } from './main.service';

import { AdminModule } from '@/admin/admin.module';

import { StudentModule } from '@/student/student.module';

@Module({
  imports: [forwardRef(() => AdminModule), forwardRef(() => StudentModule)],
  controllers: [MainController],
  providers: [MainService],
  exports: [MainService],
})
export class MainModule {}
