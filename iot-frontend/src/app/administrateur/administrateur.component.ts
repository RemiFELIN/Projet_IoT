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

  constructor( private capteurService: GetCapteursService) {
    this.capteur = null;
    this.adresseMac = null;
    this.suppCapteur = null;
    this.capteurs = [];
   }

  ngOnInit(): void {
    this.subscription = this.capteurService.getCapteurs().subscribe(capteurs => this.capteurs = capteurs)
  }

  save(){
    // this.capteurService.ajouter(obj);

  }

  supprimer(){
    // this.capteurService.supprimer(obj);
  }
}
