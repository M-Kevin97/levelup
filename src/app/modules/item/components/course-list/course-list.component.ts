import { Component, OnInit, Input } from '@angular/core';
import { Course, ICourse } from 'src/app/modules/shared/models/course/course';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/modules/shared/models/course/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  @Input() courses: Array<Course|ICourse>;
  coursesSubscription: Subscription;
  tit:string;

  constructor(protected router:Router, 
              protected courseService:CourseService) {
    
    console.log(this.courses);
  }

  ngOnInit() {

    console.log(this.courses);
  }

  consultCourse(course: Course){
    if(course){
      // rediriger vers la formation
    }
  }

  getInstructorName(course:Course) {
    if(course.instructor)
    {
      return course.instructor.firstname+" "+course.instructor.lastname;
    }
  }

  ngOnDestroy(){
    if (this.coursesSubscription != null) {
      this.coursesSubscription.unsubscribe();
    }
  }
}