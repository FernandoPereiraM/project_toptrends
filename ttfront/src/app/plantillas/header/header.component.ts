import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  constructor( private router:Router){
  }

  misquerys() {
    this.router.navigate(['/dashboard']);
  }

  exit(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['']);
  }

  ngOnInit(): void {

  }
}
