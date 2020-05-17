import { Component, OnInit } from '@angular/core';
import { GetCapteursService } from '../services/get-capteurs.service';
import { Capteur } from '../capteurs';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css']
})

export class AdministrateurComponent implements OnInit {
  public capteur: any;
  public adresseMac: any;
  public suppCapteur: any;
  public capteurs: any;
  public subscription: any;
  public listOfCapteur: Array<Capteur> = new Array<Capteur>();

  constructor( private capteurService: GetCapteursService) {
    this.suppCapteur = null;
    this.subscription = this.capteurService.getCapteurs()
      .subscribe(cap => {
        this.capteurs = cap;
      });
   }

  ngOnInit(): void {
   
  }


  supprimer(){
    this.capteurService.supprimer(this.suppCapteur.mac);
  }
}
