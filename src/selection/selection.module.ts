import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SelectionController } from './selection.controller';
import { SelectionService } from './selection.service';

import { StudentModule } from '@/student/student.module';

import { StudentEntity } from '@/student/student.entity';
import { SelectionEntity } from '@/selection/selection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SelectionEntity]),
    TypeOrmModule.forFeature([StudentEntity]),
    forwardRef(() => StudentModule),
  ],
  controllers: [SelectionController],
  providers: [SelectionService],
  exports: [SelectionService],
})
export class SelectionModule {}
