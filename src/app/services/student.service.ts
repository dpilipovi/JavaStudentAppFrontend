import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student';
//import { STUDENTS } from '../mock-students';
import { Observable, of } from "rxjs";
import http from "../http-common";
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
  })
  export class StudentService {

    private studentsUrl = 'http://localhost:8080/student';
    httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(
    private http: HttpClient
    ) { }

    getStudents(): Observable<Student[]> {
      return this.http.get<Student[]>(this.studentsUrl,this.httpOptions).pipe(
        tap(_ => console.log('fetched students')),
        catchError(this.handleError<Student[]>('getStudents', []))
        );

      }

    getStudentByJmbag(jmbag): Observable<Student>{
      const url = `${this.studentsUrl}/${jmbag}`;
      return this.http.get<Student>(url,this.httpOptions).pipe(
        tap(_ => console.log(`fetched student`)),
        catchError(this.handleError<Student>('get Student')))
    }

    deleteStudent(jmbag)
    {
      const url= `${this.studentsUrl}/${jmbag}`;
      //console.log(url)
      return this.http.delete(url,this.httpOptions).subscribe(_ => console.log(`deleted student JMBAG=`+jmbag)),
        catchError(this.handleError<Student>('deleteStudent'))

    }

    addStudent(student: Student): Observable<Student> {
      return this.http.post<Student>(this.studentsUrl,student,this.httpOptions).pipe(
        tap(_ => console.log(`added student`)),
        catchError(this.handleError<Student>('addStudent')))
    }

    updateStudentECTS(jmbag : String, ects : number) {
      const url = `${this.studentsUrl}/${jmbag}`;
      return this.http.put<Student>(url, ects, this.httpOptions).subscribe(() => console.log(`updated ects for student with jmbag=${jmbag}`)),
      catchError(this.handleError<Student>('updateStudent'))
      }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
      };
      }

  }
