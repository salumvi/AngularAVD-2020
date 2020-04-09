import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugines();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./loginRegister.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {

    init_plugines();
  }

  ingresar(e){

    console.log(e);
    this.router.navigate(['dashboard']);
  }
}
