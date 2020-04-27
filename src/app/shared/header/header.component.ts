import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from 'src/app/services/services/login-register.service';
import { Usuario } from 'src/app/models/usuario.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  
  constructor( 
    public lrs: LoginRegisterService,
    private route: Router) { }

  ngOnInit(): void {


  }

  logOut(){
    this.lrs.logout();
  }

  buscar(valor: string) {
   
    this.route.navigateByUrl('/buscador/' + valor).then(() => document.location.reload);
  }

}
