import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../interfaces/student';
import { ActivatedRoute } from '@angular/router';
import { StudentService} from "../../services/student.service";
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private route: ActivatedRoute, private studentService: StudentService, private _snackBar: MatSnackBar, private courseService: CourseService) { }

  ngOnInit(): void {
    this.jmbag = this.route.snapshot.paramMap.get('jmbag');
    this.studentService.getStudentByJmbag(this.jmbag).subscribe(s =>this.student=s)
    this.edit=false;
    this.courseService.getCoursesByJmbag(this.jmbag).subscribe(c => this.courses=c)
  }

  updateStudentECTS(ects: number)
  {
    if(!ects) return;
    if(this.studentService.updateStudentECTS(this.student.jmbag,/*this.student.numberOfECTS+*/ects*1))
    {
      this.student.numberOfECTS+=ects*1;
      this.edit=!this.edit;
      this.openSuccessSnackBar("Student ECTS izmijenjen")
    }
    else{
      this.openErrorSnackBar("Greška")
    }

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  openErrorSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
      panelClass: ['red-snackbar']
    });
  }

  openSuccessSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
      panelClass: ['green-snackbar']
    });
  }


}
