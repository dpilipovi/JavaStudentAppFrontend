import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course';
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
  export class CourseService {

    private courseUrl = 'http://localhost:8080/course';
    httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(
    private http: HttpClient
    ) { }

    getCourses(): Observable<Course[]> {
      return this.http.get<Course[]>(this.courseUrl,this.httpOptions).pipe(
        tap(_ => console.log('fetched courses')),
        catchError(this.handleError<Course[]>('getCourses', []))
        );

      }

    getCoursesByJmbag(jmbag): Observable<Course[]>{
      const url = `${this.courseUrl}/${jmbag}`;
      return this.http.get<Course[]>(url,this.httpOptions).pipe(
        tap(_ => console.log(`fetched courses`)),
        catchError(this.handleError<Course[]>('getCourses by jmbag')))
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
      };
      }

  }
