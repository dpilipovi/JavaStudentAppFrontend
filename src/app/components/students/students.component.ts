import { Component, OnInit } from '@angular/core';
import { Student } from '../../interfaces/student';
import { StudentService} from "../../services/student.service";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import AOS from 'aos';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';


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
selector: 'app-students',
templateUrl: './students.component.html',
styleUrls: ['./students.component.css'],
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


export class StudentsComponent implements OnInit {
students: Student[];
selectedStudent: Student;
selectedEcts: number;
studentAddForm: FormGroup;

submitted = false;


constructor(private studentService: StudentService,private _adapter: DateAdapter<any>,private _snackBar: MatSnackBar,public fb: FormBuilder) { }

/*croatia() {
  this._adapter.setLocale('hr');
}*/

ngOnInit() {
    this.getStudents();

    AOS.init({
      duration: 400,
    })

    this.studentAddForm = this.fb.group({
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

  getStudents() {
    this.studentService.getStudents().subscribe(s => this.students=s);
    //console.log(this.students);
  }

  onSelect(student: Student) {
    this.selectedStudent = student;
    this.selectedEcts = student.numberOfECTS;
  }

  addStudent(firstName: string, lastName: string, jmbag: string, numberOfECTS: number, dateOfBirth: String){
    if (!firstName || ! lastName || !jmbag || !numberOfECTS || !dateOfBirth)
    {
     // this.openErrorSnackBar("Morate popuniti sva polja")
      return;
    }

    let datum = dateOfBirth.split('.');
    if(datum[0].length<2) datum[0]=this._to2digit(datum[0])
    if(datum[1].length<2) datum[1]=this._to2digit(datum[1])
    dateOfBirth=datum[0]+'.'+datum[1]+'.'+datum[2]+'.';

    this.studentService.addStudent({ firstName, lastName, jmbag, numberOfECTS, dateOfBirth } as Student)
    .subscribe(student => {
      if(student)
      {
        this.students.push(student);
        this.openSuccessSnackBar("Student dodan")
      }
      else
      {
        this.openErrorSnackBar("Student nije dodan, JMBAG nije dobar ili već postoji")
      }

  });

  }

  deleteStudent(jmbag){
    this.studentService.deleteStudent(jmbag)
    this.students = this.students.filter(s => s.jmbag != jmbag)
    this.openInfoSnackBar("Student izbrisan")
  }

  private _to2digit(n: String) {
    return ('00' + n).slice(-2);
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

  openInfoSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.studentAddForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.studentAddForm.value))
}

}
