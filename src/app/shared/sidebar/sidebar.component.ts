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


  constructor(public sSer: SidebarService,
              public lrs: LoginRegisterService) {
    // console.log(sSer);
   }

  ngOnInit(): void {

  }
  logOut(){
    this.lrs.logout();
  }

}
