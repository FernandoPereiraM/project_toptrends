import { Component, OnInit, Query } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
})
export class EditarComponent implements OnInit {
  form!: FormGroup;                                           //Form to manipulate
  today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');     //Format the actual date
  countries: string[] = ["USA", "Argentina", "Australia", "Austria", "Belgium",
    "Brazil", "Canada", "Chile", "Colombia", "Czech Republic",
    "Denmark", "Egypt", "Finland", "France", "Germany",
    "Hungary", "India", "Indonesia", "Israel", "Italy",
    "Japan", "Malaysia", "Mexico", "Netherlands", "New Zealand",
    "Nigeria", "Norway", "Philippines", "Poland", "Portugal",
    "Romania", "Saudi Arabia", "South Africa", "South Korea",
    "Sweden", "Switzerland", "Taiwan", "Thailand", "Turkey",
    "Ukraine", "United Kingdom", "Vietnam"
  ];                                                          //Country data

  constructor(private router: Router, private fb: FormBuilder, private api: ApiService,private toastr: ToastrService) {

  }

  //load the previusly data in the form
  ngOnInit(): void {
    this.form = this.fb.group({
      selectedCountry: [sessionStorage.getItem('countryn_temp'), Validators.required],
      topGroup: [this.retornartopGroup(), Validators.required],
      timeGroup: [this.retornartimeGroup()],
      timeGroup2: [this.retornartimeGroup2()],
      fecha: [this.today, [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      query_name: [sessionStorage.getItem('queryn_temp'), Validators.required],
      description: [sessionStorage.getItem('queryc_temp'), Validators.required],
    });
  }

  //POST the form to my api
  onSubmit() {
    const obj: any = {
      query_name: sessionStorage.getItem('queryn_temp'),
      query_comentary: sessionStorage.getItem('queryc_temp'),
      country_name: sessionStorage.getItem('countryn_temp'),
      es_date: sessionStorage.getItem('esdate_temp'),
      id: sessionStorage.getItem('id_temp'),
      is_orderScore: sessionStorage.getItem('ism_temp'),
      is_today: sessionStorage.getItem('ist_temp'),
      is_orderRank: sessionStorage.getItem('isw_temp'),
      is_top_rising: sessionStorage.getItem('istr_temp'),
      is_top_term: sessionStorage.getItem('istt_temp'),
      user_name: localStorage.getItem('nombre'),
    };
    this.agregar_query(obj);
  }

  agregar_query(obj: any) {
    if (this.form.valid) {
      const formData = this.form.value;
      obj.query_name = formData.query_name;
      obj.query_comentary = formData.description;
      obj.country_name = formData.selectedCountry;
      obj.is_top_term = formData.topGroup === '1';
      obj.is_top_rising = formData.topGroup === '2';
      obj.is_today = formData.timeGroup === '1';
      obj.is_orderScore = formData.timeGroup2 === '2';
      obj.is_orderRank = formData.timeGroup2 === '1';
      if (formData.fecha == 1 ) {
        obj.es_date = this.today;
      } else {
        obj.es_date = formData.fecha;
      }
      this.putQuery(obj);
    } else {
      this.toastr.info("You must complete the form to post!! ", 'Info')
    }
  }

  retornartopGroup() {
    const is_top_termValue = sessionStorage.getItem('istt_temp') === 'true' ? '1' : 0;
    const is_top_risingValue = sessionStorage.getItem('istr_temp') === 'true' ? '2' : 0;
    if (is_top_termValue == '1') {
      return is_top_termValue
    } else {
      return is_top_risingValue
    }
  }

  retornartimeGroup() {
    const isTodayValue = sessionStorage.getItem('ist_temp') === 'true' ? '1' : 0;
    if (isTodayValue == '1') {
      return isTodayValue
    }else{
      return false
    }
  }

  retornartimeGroup2() {
    const orderScorealue = sessionStorage.getItem('isw_temp') === 'true' ? '1' : 0;
    const orderRankValue = sessionStorage.getItem('ism_temp') === 'true' ? '2' : 0;
    if (orderScorealue == '1') {
      return orderScorealue
    }else{
      return orderRankValue
    }
  }

  putQuery(obj: any) {
    this.api.queryPut(obj).subscribe(
      (response) => {
        this.toastr.info("Update Querys!! ", 'Success')
        this.router.navigate(['/dashboard']);

      },
      (error) => {
        this.toastr.error("Update Querys!! ", 'Error')
      }
    );
  }
}
