import { Component, OnInit } from '@angular/core';
import { GetCapteursService } from '../services/get-capteurs.service';
import { Subscription } from 'rxjs';
import { Capteur } from '../capteurs';
import { capteurs } from '../mock-capteurs';
import {FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-capteurs',
  templateUrl: './capteurs.component.html',
  styleUrls: ['./capteurs.component.css']
})

export class CapteursComponent implements OnInit {

  gaz: number = 0;
  mouvement: number = 0;
  bruit: number = 1;
  subscription: Subscription;
  listOfCapteur: Array<Capteur> = new Array<Capteur>();
  selectedValue: string = "micro";
  ip:string;
  capteur: Capteur;
  capteurs: Capteur[];
  data: Capteur;
  states = [
    {name: 'Arizona', abbrev: 'AZ'},
    {name: 'California', abbrev: 'CA'},
    {name: 'Colorado', abbrev: 'CO'},
    {name: 'New York', abbrev: 'NY'},
    {name: 'Pennsylvania', abbrev: 'PA'},
  ];

  form = new FormGroup({
    state: new FormControl(this.states[3])})

  constructor(private capteurService: GetCapteursService) { 
    this.capteurs = capteurs;
    this.subscription = this.capteurService.getCapteurs()
    .subscribe(capteurs => this.data = capteurs)
  }

  addCapteur(){
    console.log(capteurs)
    const c = capteurs.find(c => console.log(this.selectedValue));
    console.log(c);
    // this.listOfCapteur.push(c);
  }

  ngOnInit(): void {
  }

}
