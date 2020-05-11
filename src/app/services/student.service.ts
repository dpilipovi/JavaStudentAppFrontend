import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student';
//import { STUDENTS } from '../mock-students';
import { Observable, of } from "rxjs";
import http from "../http-common";
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_API_URL } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
  })
  export class StudentService {

    private studentsUrl = `${SERVER_API_URL}/student`;

    constructor(
    private http: HttpClient
    ) { }

    getStudents(): Observable<Student[]> {
      return this.http.get<Student[]>(this.studentsUrl).pipe(
        tap(_ => console.log('fetched students')),
        catchError(this.handleError<Student[]>('getStudents', []))
        );

      }

    getStudentByJmbag(jmbag): Observable<Student>{
      const url = `${this.studentsUrl}/${jmbag}`;
      return this.http.get<Student>(url).pipe(
        tap(_ => console.log(`fetched student`)),
        catchError(this.handleError<Student>('get Student')))
    }

    deleteStudent(jmbag)
    {
      const url= `${this.studentsUrl}/${jmbag}`;
      //console.log(url)
      return this.http.delete(url).subscribe(_ => console.log(`deleted student JMBAG=`+jmbag)),
        catchError(this.handleError<Student>('deleteStudent'))

    }

    addStudent(student: Student): Observable<Student> {
      return this.http.post<Student>(this.studentsUrl,student).pipe(
        tap(_ => console.log(`added student`)),
        catchError(this.handleError<Student>('addStudent')))
    }

    editStudent(student: Student): Observable<any> {
      const url = `${this.studentsUrl}`;
      return this.http.put(url, student).pipe(
        tap(_ => console.log(`updated student jmbag=${student.jmbag}`)),
        catchError(this.handleError<any>('updateStudent'))
      );
    }

    getStudentsByCourse(name): Observable<Student[]>
    {
      const url = `${this.studentsUrl}/getStudentsByCourse/${name}`;
      return this.http.get<Student[]>(url).pipe(
        tap(_ => console.log('fetched students by course')),
        catchError(this.handleError<Student[]>('getStudentsByCourse', []))
      );
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
      };
      }

  }
