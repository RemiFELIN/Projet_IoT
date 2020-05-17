import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { GetCapteursService } from '../services/get-capteurs.service';
import { Subscription } from 'rxjs';
import { Capteur } from '../capteurs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  subscription: Subscription;
  capteurs: Capteur[] = [{type: "Microphone", text: {
    danger: "Alerte un bruit virulant a été detecté",
    warning: "Un léger bruit a été detecté",
    success: "Votre maison est calme, aucun bruit detecté",
},
src: {
    danger: "../../assets/noise.svg",
    warning: "../../assets/warning.svg",
    success: "../../assets/safe.svg",
},who:"oui"}];
  arrayOfCanvas: HTMLElement[];

  constructor(private capteurService: GetCapteursService) { 
  }

  ngOnInit(): void {
    // this.subscription = this.capteurService.getCapteurs()
    // .subscribe(capteurs => this.capteurs = capteurs);
    // this.capteurs.forEach(capteur => {
    //   this.arrayOfCanvas.push(document.createElement("canvas"));
    // });
    var ctx = document.getElementById('oui');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
				labels: ['-60s', '-50s', '-40s', '-30s', '-20s', '-10s', 'Maintenant'],
        datasets: [{
          label: 'Danger potentiel dans l\'air',
          data: [1, 2, 2, 2, 1, 2,2],
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

}
