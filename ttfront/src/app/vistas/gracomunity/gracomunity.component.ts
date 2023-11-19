import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { top25 } from '../../modelos/querysearch.interface';
import { Router } from '@angular/router';
import { Coment } from '../../modelos/query.interface';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gracomunity',
  templateUrl: './gracomunity.component.html',
  styleUrl: './gracomunity.component.scss'
})
export class GracomunityComponent implements OnInit {
  form!: FormGroup;

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { min: 0, max: 25 },
      y: { min: 0, max: 100 }
    },
    indexAxis: 'x',
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  listaTop25: top25[] = [];
  listaC: Coment[] = [];
  barChartData: ChartDataset[] = [{ data: [], label: 'Score Designated Market Area DMA' }];

  titulo: string = sessionStorage.getItem('qn_temporal') || 'Default Title';
  description: string = sessionStorage.getItem('qc_temporal') || 'Default comentario';
  idTemporal: string = sessionStorage.getItem('id_temporal') || 'Default comentario';

  pageSize: number = 3; // Number of comments per page
  currentPage: number = 1; // Current page

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
  constructor(private api: ApiService, private router: Router, private fb: FormBuilder,) { }

  ngOnInit() {
    this.loadData();
    this.loadcoments();
    this.form = this.fb.group({
      comentary: ['', Validators.required]
    });
  }

  onSubmit() {
    const obj: any = {
      user_com: "0",
      user_name: localStorage.getItem('nombre'),
      query: this.idTemporal
    };
    this.add_comentary(obj);
  }

  add_comentary(obj : any){
    if (this.form.valid) {
      const formData = this.form.value;
      obj.user_com = formData.comentary;
      this.comPost(obj);
    } else {
      console.log('Formulario inválido. Por favor, completa los campos correctamente.');
    }
  }

  comPost(obj:any){
    this.api.comPost(obj).subscribe(
      (response) => {
        console.log('Success!!');
        this.loadcoments();
      },
      (error) => {
        console.error('Error in post request:', error);
      }
    );
  }

  loadcoments(){
    this.api.querycomentsGet(this.idTemporal).subscribe(
      (data: Coment[]) => {
        if (data.length > 0) {
          this.listaC = data;
        }
      }
    );
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
    }
  }
}
