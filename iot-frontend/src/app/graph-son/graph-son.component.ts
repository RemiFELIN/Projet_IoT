import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-graph-son',
  templateUrl: './graph-son.component.html',
  styleUrls: ['./graph-son.component.css']
})
export class GraphSonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var ctx = document.getElementById('graphSon');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
				labels: ['-60s', '-50s', '-40s', '-30s', '-20s', '-10s', 'Maintenant'],
        datasets: [{
          label: 'Bruit ambiant',
          data: [12, 19, 3, 5, 2, 3,2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
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
