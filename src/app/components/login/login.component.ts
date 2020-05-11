import { Component, OnInit } from '@angular/core';
import { UserCredentials } from 'src/app/interfaces/user-credentials';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { JwtToken } from 'src/app/interfaces/jwt-token';
import { User } from 'src/app/interfaces/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFailed = false; // to show login failed message
  loginForm: FormGroup;
  userCredentials: UserCredentials;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService,
    public fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.userCredentials = new UserCredentials();
    // provjeriti da li je vec ulogiran

    this.loginForm = this.fb.group({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    })
  }

  login() {
    this.loginFailed = false;

    if(this.userCredentials.username == null || this.userCredentials.username == '')
    {
      this.userCredentials.username = this.loginForm.controls['username'].value;
      this.userCredentials.password = this.loginForm.controls['password'].value;
    }

    this.loginService.authenticate(this.userCredentials).subscribe(
      (jwtToken: JwtToken) => this.successfulLogin(jwtToken),
      () => this.loginFailed = true
    )
  }

  successfulLogin(jwtToken: JwtToken) {
    localStorage.setItem('token', jwtToken.token); // store token value to localstorage
    this.userService.getCurrentUser().subscribe((currentUser: User) => this.userService.currentUser = currentUser);
    this.router.navigate(['/']);
  }

}
