import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../interfaces/student';
import { ActivatedRoute } from '@angular/router';
import { StudentService} from "../../services/student.service";
import { Course } from '../../interfaces/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
selector: 'app-student-detail',
templateUrl: './student-detail.component.html',
styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

   student: Student;
   jmbag : string;
   edit : boolean;
   courses: Course[];

  constructor(private route: ActivatedRoute, private studentService: StudentService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.jmbag = this.route.snapshot.paramMap.get('jmbag');
    this.studentService.getStudentByJmbag(this.jmbag).subscribe(s =>this.student=s)
    this.courseService.getCoursesByJmbag(this.jmbag).subscribe(c => this.courses=c)
  }

}
