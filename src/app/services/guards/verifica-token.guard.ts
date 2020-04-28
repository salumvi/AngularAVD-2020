import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    private lrs: LoginRegisterService,
    private router: Router) {

  }
  canActivate(): Promise<boolean> | boolean {

    const token = this.lrs.token;
    const payload = JSON.parse(atob(token.split('.')[1]));

    // is el token ha expirado no dejamos entrar y no vamos a login
    if (this.expiroToken(payload.exp)) {

      this.router.navigate(['/login']);
      return false;
    }

    // si está a punto de Expirar lo renovamos:
    // esto se hará al entrar en la ruta donde coloquemos el guard

    return this.revobarToken(payload.exp);
  }


  revobarToken(fechaExp: number): Promise<boolean> {

    return new Promise((todbien, todomal) => {
      const tokenExp = new Date(fechaExp).getTime() * 1000;
      const horaRenovarT = new Date().getTime();
      console.log(tokenExp, horaRenovarT);
      // El token exira en 4 horas
      // la hora a renovar la ponemos nosortos, si ponemos 4 horas nunca entrará por el if
      if (tokenExp > horaRenovarT) {
        console.log('todobien');
        todbien(true);
      } else {
        // está a punto de expirar => generamos un token nuevo
        this.lrs.renovarToken().subscribe(() => {
          todbien(true);
          console.log('todobien');

        }, () => {
          todomal(false);
          console.log('login expiro');

          this.router.navigate(['/login']);
        });
      }


    });

  }


  expiroToken(fechaExp: number): boolean {
    console.log('login expiro');

    return (new Date().getTime() / 1000) > fechaExp;
  }

}