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


  constructor(private capteurService: GetCapteursService, private modalService: NgbModal) {
    this.capteurs = capteurs;
    this.subscription = this.capteurService.getCapteurs()
      .subscribe(cap => {
        this.listOfCapteur = this.addProperties(cap);
        console.log(this.listOfCapteur)
      });
    this.capteurService.requestCapteurs();
  }

  addProperties(arr: Capteur[]): Capteur[] {
    var res = [];
    arr.forEach(ca => {
      capteurs.forEach(cap => {
        if(ca.type == cap.type){
          var tmp = cap;
          tmp.who = ca.who;
          tmp.value =  ca.value;
          console.log(ca.value)
          res.push(tmp)
        }
      })
    })
    return res;
  }

  openModal(content, capt: Capteur) {
    this.modalService.open(content, { size: 'xl' });
    var ctx = document.getElementById("graph");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['-60s', '-50s', '-40s', '-30s', '-20s', '-10s', 'Maintenant'],
        datasets: [{
          label: capt.type,
          data: capt.value ,
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
              suggestedMax: 100
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

}
