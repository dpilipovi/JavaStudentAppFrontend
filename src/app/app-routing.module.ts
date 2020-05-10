import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentsComponent } from './components/students/students.component';
import { StudijComponent} from './components/studij/studij.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { AdminAuthGuardService } from './guards/admin-auth-guard.service';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';


const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path:'students', component: StudentsComponent, canActivate: [AuthGuardService] },
  { path: 'student-detail/:jmbag', component: StudentDetailComponent, canActivate: [AdminAuthGuardService]},
  //{ path: 'studij', component: StudijComponent},
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuardService]},
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuardService]},
  { path: 'course-detail/:name', component: CourseDetailComponent , canActivate: [AdminAuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'forbidden', component: ForbiddenComponent},
  { path: '**', component: PagenotfoundComponent }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
