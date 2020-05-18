import { Component, Input } from '@angular/core';
import { GetCapteursService } from '../services/get-capteurs.service';
import { Subscription } from 'rxjs';
import { Capteur } from '../capteurs';
import { capteurs } from '../mock-capteurs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Chart from 'chart.js';

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
  @Input() radioButton: boolean;
  suppCapteur: string;


  constructor(private capteurService: GetCapteursService, private modalService: NgbModal) {
    this.capteurs = capteurs;
    this.capteurService.requestCapteursFirst().then(res => this.listOfCapteur = this.addProperties(res));
    this.subscription = this.capteurService.getCapteurs()
      .subscribe(cap => {
        for (let index = 0; index < this.listOfCapteur.length; index++) {
          const element = this.listOfCapteur[index];
          cap.forEach(c => {
            if(c.who == element.who){
              this.listOfCapteur[index].values.push(c.value);
            }
          })
        }
      });
    this.capteurService.requestCapteurs();
  }

  addProperties(arr: Capteur[]): Capteur[] {
    var res = [];
    arr.forEach(ca => {
      capteurs.forEach(cap => {
        if (ca.type == cap.type) {
          var tmp = cap;
          tmp.who = ca.who;
          tmp.value = ca.value;
          tmp.values = [ca.value];
          res.push(tmp)
        }
      })
    })
    return res;
  }

  addPropertie(ca: Capteur): Capteur {
    var res = null;
    capteurs.forEach(cap => {
      if (ca.type == cap.type) {
        var tmp = cap;
        tmp.who = ca.who;
        tmp.value = ca.value;
        tmp.values = [ca.value];
        res = tmp
      }
    })
    return res;
  }

  openModal(content, capt: Capteur) {
    console.log(capt.values)
    this.modalService.open(content, { size: 'xl' });
    var ctx = document.getElementById("graph");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['-60s', '-50s', '-40s', '-30s', '-20s', '-10s', 'Maintenant'],
        datasets: [{
          label: capt.type,
          data: capt.values,
          backgroundColor: [
            'rgba(147,112,219,0.2)',
          ],
          borderColor: [
            'rgba(147,112,219,1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: capt.seuil
            }

          }]
        }
      }
    });
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
    if (capteurExist) {
      capteurs.forEach(c => {
        if (c.type == this.selectedValue.type) {
          const cap = c;
          cap.who = this.ip;
          this.capteurService.ajouter(c.who);
          this.listOfCapteur.push(c);
        }
      })
      this.capteurService.updateCapteurs(this.listOfCapteur);
    }
    else {
      alert("Aucun object connecté avec cette adresse IP");
    }

  }

  supprimer() {
    this.capteurService.supprimer(this.suppCapteur);
  }

}
