import { forwardRef, Module } from '@nestjs/common';

import { SharedModule } from './shared.module';
import { DatabaseModule } from './database/database.module';
import { MainModule } from './main/main.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { SelectionModule } from './selection/selection.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    SharedModule,
    forwardRef(() => DatabaseModule),
    forwardRef(() => AdminModule),
    forwardRef(() => StudentModule),
    forwardRef(() => SelectionModule),
    forwardRef(() => CourseModule),
    forwardRef(() => MainModule),
  ],
})
export class AppModule {}
