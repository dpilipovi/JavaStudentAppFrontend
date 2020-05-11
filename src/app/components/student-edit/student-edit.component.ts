import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/interfaces/student';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { delay } from 'src/app/util/delay';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY.',
  },
  display: {
    dateInput: 'DD.MM.YYYY.',
    monthYearLabel: 'MMM YYYY.',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY.',
  },
};

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'hr'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
  })

export class StudentEditComponent implements OnInit {

  student : Student;
  jmbag : String;
  studentEditForm : FormGroup



  constructor(private _snackBar: MatSnackBar, private studentService : StudentService, private route: ActivatedRoute, private _adapter: DateAdapter<any>, public fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.jmbag = this.route.snapshot.paramMap.get('jmbag');
    this.studentService.getStudentByJmbag(this.jmbag).subscribe(s =>
      {
      this.student = s
      console.log(s)
      this.studentEditForm.setValue({
        firstName: s.firstName,
        lastName: s.lastName,
        numberOfECTS:s.numberOfECTS,
        dateOfBirth: s.dateOfBirth,
        jmbag: s.jmbag
       })

      })


    this.studentEditForm = this.fb.group({
      firstName: new FormControl('', [
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      dateOfBirth: new FormControl('', [
        Validators.required
      ]),
      jmbag: new FormControl('', [
        Validators.required,
        Validators.pattern(new RegExp('^\\d+$')),
        Validators.maxLength(10),
        Validators.minLength(10)
      ]),
      numberOfECTS: new FormControl('', [
        Validators.required,
        Validators.pattern(new RegExp('^\\d+$')),
        Validators.max(480),
        Validators.min(0)
      ])
    })

  }

  editStudent()
  {
    this.student.firstName=this.studentEditForm.controls['firstName'].value;
    this.student.lastName=this.studentEditForm.controls['lastName'].value;
    this.student.numberOfECTS=this.studentEditForm.controls['numberOfECTS'].value;

    if( this.studentEditForm.controls['dateOfBirth'].value != this.student.dateOfBirth)
    {
    let datum = this.studentEditForm.controls['dateOfBirth'].value
    this.student.dateOfBirth=this._to2digit(datum._i.date)+'.'+this._to2digit(datum._i.month)+'.'+datum._i.year+'.';
    }
    else
    {
      let datum = this.studentEditForm.controls['dateOfBirth'].value.split("-")
      this.student.dateOfBirth=datum[2]+"."+datum[1]+"."+datum[0]+"."
    }

    this.studentService.editStudent(this.student).subscribe(
      student =>
      {
        if(student)
        {
          this.openSuccessSnackBar("Student uspjesno izmijenjen")
          delay(2000).then(() => this.router.navigate(['student-detail/'+this.jmbag]));
        }
        else  this.openErrorSnackBar("Dogodila se greška na bazi!")
      }
    )
  }

  private _to2digit(n: String) {
    return ('00' + n).slice(-2);
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
