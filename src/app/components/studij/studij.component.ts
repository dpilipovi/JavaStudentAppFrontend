import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-studij',
  templateUrl: './studij.component.html',
  styleUrls: ['./studij.component.css']
})
export class StudijComponent implements OnInit {

  @Input() ects : number;

  constructor() { }

  ngOnInit(): void {
    console.log(this.ects);
  }


  /*
  
0-180 - preddiplomski

180-300 - diplomski

300-480 - postdiplomski
*/

  getStudij(): string
  {
    if(this.ects<=180) return "Preddiplomski"
    else if(this.ects<=300) return "Diplomski"
    else if(this.ects<=480) return "Postdiplomski"
   // else return "master"
  }

}
