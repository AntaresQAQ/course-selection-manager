import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseEntity } from './course.entity';

import { SelectionEntity } from '@/selection/selection.entity';
import { SelectionModule } from '@/selection/selection.module';

import { StudentEntity } from '@/student/student.entity';
import { StudentModule } from '@/student/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity]),
    TypeOrmModule.forFeature([SelectionEntity]),
    TypeOrmModule.forFeature([StudentEntity]),
    forwardRef(() => SelectionModule),
    forwardRef(() => StudentModule),
  ],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
