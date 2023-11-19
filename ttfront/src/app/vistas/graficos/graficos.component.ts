import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { top25 } from '../../modelos/querysearch.interface';
import { Router } from '@angular/router';
import { Coment } from '../../modelos/query.interface';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { min: 0, max: 25 },
      y: { min: 0, max: 100 }
    },
    indexAxis: 'x',
  };

  barChartLabels: string[] = [];         // Labels of the graph
  barChartType: ChartType = 'bar';       // Type of Graph
  barChartLegend = true;
  listaTop25: top25[] = [];              //List of Top25 data from the api
  listaC: Coment[] = [];                 //List off Comments
  barChartData: ChartDataset[] = [{ data: [], label: 'Score Designated Market Area DMA' }];

  titulo: string = sessionStorage.getItem('qn_temporal') || 'Default Title';
  description: string = sessionStorage.getItem('qc_temporal') || 'Default comentario';
  idTemporal: string = sessionStorage.getItem('id_temporal') || 'Default comentario';

  pageSize: number = 3; // Number of comments per page
  currentPage: number = 1; // Current page

  constructor(private api: ApiService, private router: Router) { }


  //LOAD THE DATA IN THE GRAPH AND ADD THE COMENTS OF THE QUERY
  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    const idTemporal = sessionStorage.getItem('id_temporal');

    if (idTemporal) {
      this.api.queryGetTop25(idTemporal).subscribe(
        (data: top25[]) => {
          if (data.length > 0) {
            this.listaTop25 = data;
            this.barChartLabels = this.listaTop25.map(item => item.term);
            this.barChartData[0].data = this.listaTop25.map(item => item.score);
          }
        },
        error => {
          console.error('Error en la solicitud:', error);
        }
      );

      this.api.querycomentsGet(idTemporal).subscribe(
        (data: Coment[]) => {
          if (data.length > 0) {
            this.listaC = data;
          }
        }
      );
    }
  }


  //Comment paging
  get paginatedComments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.listaC.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.listaC.length / this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

}

