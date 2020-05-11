import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
import { Course } from '../../interfaces/course';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[];

  constructor(private studentService: StudentService, private courseService: CourseService, private userService: UserService) { }

  ngOnInit(): void {

  }

  getCoursesByName(name)
  {
    this.courseService.getCoursesByName(name.value).subscribe(c => this.courses=c)
  }

  isRoleAdmin()
  {
    return this.userService.isRoleAdmin()
  }


}
