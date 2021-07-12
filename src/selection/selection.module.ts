import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SelectionController } from './selection.controller';
import { SelectionService } from './selection.service';
import { SelectionEntity } from './selection.entity';

import { StudentModule } from '@/student/student.module';
import { StudentEntity } from '@/student/student.entity';

import { CourseModule } from '@/course/course.module';
import { CourseEntity } from '@/course/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SelectionEntity]),
    TypeOrmModule.forFeature([StudentEntity]),
    TypeOrmModule.forFeature([CourseEntity]),
    forwardRef(() => StudentModule),
    forwardRef(() => CourseModule),
  ],
  controllers: [SelectionController],
  providers: [SelectionService],
  exports: [SelectionService],
})
export class SelectionModule {}
