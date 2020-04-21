import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'studapp-frontend';

  ngOnInit() {
    AOS.init({
      duration: 1200,
    });
  }


}
