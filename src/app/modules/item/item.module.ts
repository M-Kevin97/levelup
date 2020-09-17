import { CourseListComponent } from './components/course-list/course-list.component';
import { InstructorListComponent } from './components/instructor-list/instructor-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ItemComponent,
    InstructorListComponent,
    CourseListComponent
  ],
  exports: [
    InstructorListComponent,
    CourseListComponent
  ]
})
export class ItemModule { }
