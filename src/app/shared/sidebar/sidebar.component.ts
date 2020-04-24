import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/services/sidebar.service';
import { LoginRegisterService } from 'src/app/services/services/login-register.service';
import { Usuario } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;
  constructor(public sSer: SidebarService,
              private lrs: LoginRegisterService) {
    // console.log(sSer);
   }

  ngOnInit(): void {
    this.usuario = this.lrs.usuario;
  }
  logOut(){
    this.lrs.logout();
  }

}
