import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';
import { Query } from '../../modelos/query.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comdashboard',
  templateUrl: './comdashboard.component.html',
})
export class ComdashboardComponent implements OnInit {
  listaQ: Query[] = [];      // Data from Querys by Users
  pageSize: number = 3;     // Number of comments per page
  currentPage: number = 1; // Current page

  constructor(private api:ApiService, private router:Router,private toastr: ToastrService){
  }
  ngOnInit(): void {
    // Performs HTTP request only if the value exists in localStorage a shows the data!
    const nombre = localStorage.getItem("nombre");
    if (nombre) {
      this.api.querycomunityGet(nombre).subscribe(
        data => {
          if (data.length > 0) {
            this.listaQ = data;
            this.toastr.success("My Comunity Querys!! ", 'Success')
          }
        },
        error => {
          this.toastr.error("Error! ", 'Error')
        }
      );
    }
  }

  //Redirection to comunitygrahp
  ver(q: Query) {
    sessionStorage.setItem('id_temporal', q.id.toString());
    sessionStorage.setItem('qn_temporal', q.query_name.toString());
    sessionStorage.setItem('qc_temporal', q.query_comentary.toString());
    this.toastr.success('View Query '+q.query_name+'','Views');
    this.router.navigate(['/comunitygrahp']);
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
