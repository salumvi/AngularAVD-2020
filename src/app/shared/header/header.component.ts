import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from 'src/app/services/services/login-register.service';
import { Usuario } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  constructor( private lrs: LoginRegisterService) { }

  ngOnInit(): void {
    this.usuario=this.lrs.usuario;

  }

  logOut(){
    this.lrs.logout();
  }

}
