import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { Query } from '../../modelos/query.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  listaQ: Query[] = [];    // Data from Querys by User
  pageSize: number = 3;    // Number of comments per page
  currentPage: number = 1; // Current page

  constructor(private api:ApiService, private router:Router,private toastr: ToastrService ){
  }

  ngOnInit(): void {
    // Performs HTTP request only if the value exists in localStorage a shows the data!
    const nombre = localStorage.getItem("nombre");
    if (nombre) {
      this.api.queryGetList(nombre).subscribe(
        data => {
          if (data.length > 0) {
            this.listaQ = data;
            this.toastr.success("My Querys!! ", 'Success')
          }
        },
        error => {
          this.toastr.error("Error! ", 'Error')
        }
      );
    }
  }

  //Redirection to graph page, and session store some data
  consultar(q: Query) {
    sessionStorage.setItem('id_temporal', q.id.toString());
    sessionStorage.setItem('qn_temporal', q.query_name.toString());
    sessionStorage.setItem('qc_temporal', q.query_comentary.toString());
    this.toastr.info('View Query '+q.query_name+'','Views');
    this.router.navigate(['/graficos']);
  }

  //Reload the page, and delete data
  eliminar(q: Query) {
    this.api.queryDelete(q.id.toString()).subscribe(
      () => {
        this.toastr.info("Successfully deleted",'Delete')
        location.reload();
      },
      (error) => {
        this.toastr.error('Error deleting query!', 'Problems');
      }
    );
  }

  //Redirection to edit page, and session store some data
  editar(q: Query){
    sessionStorage.setItem('id_temp', q.id.toString());
    sessionStorage.setItem('countryn_temp', q.country_name.toString());
    sessionStorage.setItem('queryc_temp', q.query_comentary.toString());
    sessionStorage.setItem('ism_temp', q.is_orderRank.toString());
    sessionStorage.setItem('isw_temp', q.is_orderScore.toString());
    sessionStorage.setItem('ist_temp', q.is_today.toString());
    sessionStorage.setItem('istr_temp', q.is_top_rising.toString());
    sessionStorage.setItem('istt_temp', q.is_top_term.toString());
    sessionStorage.setItem('queryn_temp', q.query_name.toString());
    sessionStorage.setItem('esdate_temp', q.es_date.toString());
    this.toastr.info('Edit Query '+q.query_name+'','Edit');
    this.router.navigate(['/editar']);
  }



  //List paging
  get paginated() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.listaQ.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.listaQ.length / this.pageSize);
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
