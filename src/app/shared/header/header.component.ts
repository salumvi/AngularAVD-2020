import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from 'src/app/services/services/login-register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor( private lrs: LoginRegisterService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.lrs.logout();
  }

}
