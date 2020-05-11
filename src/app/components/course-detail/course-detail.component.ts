import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../interfaces/student';
import { ActivatedRoute } from '@angular/router';
import { StudentService} from "../../services/student.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from '../../interfaces/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  name: String
  course: Course
  students: Student[]

  constructor(private route: ActivatedRoute, private studentService: StudentService, private _snackBar: MatSnackBar, private courseService: CourseService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.courseService.getCourseByName(this.name).subscribe(c =>this.course = c)
    this.studentService.getStudentsByCourse(this.name).subscribe(s => this.students = s)
  }

}
