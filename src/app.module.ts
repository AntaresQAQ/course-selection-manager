import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared.module';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
