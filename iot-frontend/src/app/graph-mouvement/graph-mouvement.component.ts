import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-graph-mouvement',
  templateUrl: './graph-mouvement.component.html',
  styleUrls: ['./graph-mouvement.component.css']
})
export class GraphMouvementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var ctx = document.getElementById('graphMouvement');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
				labels: ['-60s', '-50s', '-40s', '-30s', '-20s', '-10s', 'Maintenant'],
        datasets: [{
          label: 'Mouvement dans la piece',
          data: [0, 0, 0, 0, 0, 0,0],
          backgroundColor: [
            'rgba(255,165,0,0.2)',
          ],
          borderColor: [
            'rgba(255,165,0,1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
