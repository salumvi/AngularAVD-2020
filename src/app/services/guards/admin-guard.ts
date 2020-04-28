import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private lrs: LoginRegisterService,
    private ruta: Router) {

  }
  canActivate() {

    if (this.lrs.usuario.role === 'ADMIN_ROLE') {

      return true;
    } else {
      // Le sacamos de la pantalla a login
      this.ruta.navigate(['/login']);

      console.log('Bloqueado por el ADMIN_GUARD');
      return false;
    }
  }

}
