import { Component, OnInit} from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Query } from '../../modelos/query.interface';
import { formatDate } from '@angular/common';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.scss'
})
export class NuevoComponent implements OnInit{
  form!: FormGroup;                                              //Form to manipulate
  q !: Query;
  today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');        //Format the actual date
  countries: string[] = ["USA","Argentina","Australia","Austria","Belgium",
                         "Brazil","Canada","Chile","Colombia","Czech Republic",
                         "Denmark","Egypt","Finland","France","Germany",
                         "Hungary","India","Indonesia","Israel","Italy",
                         "Japan","Malaysia","Mexico","Netherlands","New Zealand",
                         "Nigeria","Norway","Philippines","Poland","Portugal",
                         "Romania","Saudi Arabia","South Africa","South Korea",
                         "Sweden","Switzerland","Taiwan","Thailand","Turkey",
                         "Ukraine","United Kingdom","Vietnam"
  ];                                                            //Country data

  constructor(private router:Router, private fb: FormBuilder, private api:ApiService,private toastr: ToastrService) {

  }

  //load the previusly data in the form
  ngOnInit(): void {
    this.form = this.fb.group({
      selectedCountry: ['', Validators.required],
      topGroup: ['',Validators.required],
      timeGroup:[''],
      timeGroup2:[''],
      fecha: [this.today, [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      query_name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  //POST the form to my api
  onSubmit() {
    const obj: any = {
        query_name:"string",
        query_comentary:"string",
        country_name:"string",
        es_date:this.today,
        is_orderScore:false,
        is_today:false,
        is_orderRank:false,
        is_top_rising:false,
        is_top_term:false,
        user_name:"string",
    };
    this.agregar_query(obj);

  }

  agregar_query(obj : any){
    if (this.form.valid) {
      const formData = this.form.value;
      obj.query_name = formData.query_name;
      obj.query_comentary = formData.description;
      obj.country_name= formData.selectedCountry;
      obj.is_top_term = formData.topGroup === '1';
      obj.is_top_rising = formData.topGroup === '2';
      obj.is_today = formData.timeGroup === '1';
      obj.is_orderScore = formData.timeGroup2 === '2';
      obj.is_orderRank = formData.timeGroup2 === '1';
      obj.user_name = localStorage.getItem('nombre');
      if(formData.fecha==1){
        obj.es_date = this.today;
      }else{
        obj.es_date = formData.fecha;
      }
      this.postQuery(obj);
    } else {
      this.toastr.info("You must complete the form to post!! ", 'Info')
    }
  }

  postQuery(obj:any){
    this.api.queryPost(obj).subscribe(
      (response) => {
        sessionStorage.setItem('id_temporal', response.id.toString());
        sessionStorage.setItem('qn_temporal', response.query_name.toString());
        sessionStorage.setItem('qc_temporal', response.query_comentary.toString());
        this.toastr.success("Post Querys!! ", 'Success')
        this.router.navigate(['/graficos']);
      },
      (error) => {
        this.toastr.error("Post Querys!! ", 'Error')
      }
    );
  }
}
