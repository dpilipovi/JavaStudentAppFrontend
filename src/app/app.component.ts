import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(translate: TranslateService) {
    translate.setDefaultLang('hr');
    translate.use('hr');
    }

  ngOnInit() {
    AOS.init({
      duration: 1200,
    });
  }


}
