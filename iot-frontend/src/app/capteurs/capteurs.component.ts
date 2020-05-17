import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capteurs',
  templateUrl: './capteurs.component.html',
  styleUrls: ['./capteurs.component.css']

})
export class CapteursComponent implements OnInit {

  gaz: number = 0;
  mouvement: number = 0;
  bruit: number = 1;

  constructor() { }

  ngOnInit(): void {
  }
   

}
