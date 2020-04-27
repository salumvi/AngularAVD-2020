import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from 'src/app/services/services/login-register.service';
import { Usuario } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  
  constructor( public lrs: LoginRegisterService) { }

  ngOnInit(): void {


  }

  logOut(){
    this.lrs.logout();
  }

}
