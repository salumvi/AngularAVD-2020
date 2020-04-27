import { Injectable } from '@angular/core';
import { LoginRegisterService } from './login-register.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

//   menu: any = [{
//     titulo: 'Principal',
//     icono: 'mdi mdi-gauge',
//     submenu: [
//       {titulo: 'Dashboard', url: '/dashboard'},
//       {titulo: 'Progress', url: '/progress'},
//       {titulo: 'Gráficas', url: '/graficas1'},
//       {titulo: 'Temas', url: '/account-settings'},
//       {titulo: 'Promesas', url: '/promesas'},
//       {titulo: 'Rxjs', url: '/rxjs'},

//     ]
//   }, {
//     titulo: 'Mantenimiento',
//     icono: 'mdi mdi-spin mdi-shovel-off',
//     submenu: [
//       { titulo: 'Usuarios', url:  '/usuarios' },
//       { titulo: 'Medicos', url:  '/medicos' },
//       { titulo: 'hospitales', url: '/hospitales' }
//     ]
//   }
// ]

menu: any[] = [];
// para coger el menú
  constructor(private lrs: LoginRegisterService) {
 }
 cargarMenu(){
  this.menu = [...this.lrs.menu];
 }

}
