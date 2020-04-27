import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/services/sidebar.service';
import { LoginRegisterService } from 'src/app/services/services/login-register.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {


  constructor(public sSer: SidebarService,
              public lrs: LoginRegisterService,
              public ss: SidebarService) {
   }

  ngOnInit(): void {

  }
  logOut(){
    this.lrs.logout();
  }

}
