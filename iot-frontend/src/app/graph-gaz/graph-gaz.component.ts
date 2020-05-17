import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { GetCapteursService } from '../services/get-capteurs.service';
import { Subscription } from 'rxjs';
import { Capteur } from '../capteurs';

@Component({
  selector: 'app-graph-gaz',
  templateUrl: './graph-gaz.component.html',
  styleUrls: ['./graph-gaz.component.css']
})
export class GraphGazComponent implements OnInit {

  subscription: Subscription;
  capteurs: Capteur;

  constructor(private capteurService: GetCapteursService) { 
    this.subscription = this.capteurService.getCapteurs()
    .subscribe(capteurs => this.capteurs = capteurs)
  }

  ngOnInit(): void {
    var ctx = document.getElementById('graphGaz');
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
