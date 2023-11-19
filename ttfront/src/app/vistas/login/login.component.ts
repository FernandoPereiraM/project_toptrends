import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  nombre: string = '';

  loginForm = new FormGroup({
    usuario: new FormControl('',Validators.required)
  })

  constructor(private router:Router, private fb:FormBuilder,private toastr: ToastrService){

  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required]
    });

  }

  guardarNombre() {
    localStorage.setItem('nombre', this.nombre);
    this.showSuccess(this.nombre);
    this.router.navigate(['/dashboard']);
  }

  showSuccess(name: string) {
    this.toastr.success('Hello '+name+ "!", 'Wellcome!');
  }
}
