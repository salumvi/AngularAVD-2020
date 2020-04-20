import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public lrs: LoginRegisterService,
    public router: Router){

  }
  canActivate(){

   if(this.lrs.estaLogado()) {
     return true;
   } else{
     this.router.navigate(['/login']);
     return false;
   }

  }
  
}
