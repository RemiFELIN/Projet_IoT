import { Component } from '@angular/core';
import { GetCapteursService } from '../services/get-capteurs.service';
import { Subscription } from 'rxjs';
import { Capteur } from '../capteurs';
import { capteurs } from '../mock-capteurs';
@Component({
  selector: 'app-capteurs',
  templateUrl: './capteurs.component.html',
  styleUrls: ['./capteurs.component.css']
})

export class CapteursComponent {

  gaz: number = 0;
  mouvement: number = 0;
  bruit: number = 1;
  subscription: Subscription;
  listOfCapteur: Array<Capteur> = new Array<Capteur>();
  selectedValue: Capteur;
  ip:string;
  capteur: Capteur;
  capteurs: Capteur[];
  data: Capteur[];


  constructor(private capteurService: GetCapteursService) { 
    this.capteurs = capteurs;
    this.subscription = this.capteurService.getCapteurs()
    .subscribe(capteurs => this.data = capteurs)
  }

  addCapteur(){
    alert("Aucun object connecté avec cette adresse IP");
    capteurs.forEach(c =>{
      if(c.type == this.selectedValue.type){
        const cap = c;
        cap.who = this.ip;
        this.listOfCapteur.push(c);
      }
    })
    this.capteurService.updateCapteurs(this.listOfCapteur);
  }

}
