import { Component } from '@angular/core';
import { GetCapteursService } from '../services/get-capteurs.service';
import { Subscription } from 'rxjs';
import { Capteur } from '../capteurs';
import { capteurs } from '../mock-capteurs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  ip: string;
  capteur: Capteur;
  capteurs: Capteur[];


  constructor(private capteurService: GetCapteursService,private modalService: NgbModal) {
    this.capteurs = capteurs;
    this.subscription = this.capteurService.getCapteurs()
      .subscribe(cap => {
        capteurs.forEach(c => {
          cap.forEach(cs => {
            if (c.type == cs.type && this.isNotInListOfCapteur(c)) {
              const cap = c;
              cap.who = cs.who;
              cap.value = cs.value;
              this.listOfCapteur.push(cap);
            }
          })
        })
      });
    this.capteurService.requestCapteurs();
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  isNotInListOfCapteur(c: Capteur) {
    let res = true;
    this.listOfCapteur.forEach(cap => {
      if (c.type == cap.type) {
        res = false;
      }
    })
    return res;
  }

 async addCapteur() {
    const capteurExist = await this.capteurService.checkIfExist(this.ip);
    if(capteurExist){
      capteurs.forEach(c => {
        if (c.type == this.selectedValue.type) {
          const cap = c;
          cap.who = this.ip;
          this.listOfCapteur.push(c);
        }
      })
      this.capteurService.updateCapteurs(this.listOfCapteur);
    }
    else{
      alert("Aucun object connecté avec cette adresse IP");
    }

  }

}
