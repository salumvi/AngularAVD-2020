import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../models/usuario.models';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  private url: string = environment.urlApi;

  usuario: Usuario;
  token = '';
  menu: any[] = [];

  constructor(
    private http: HttpClient,
    public router: Router) {
    this.cargarStorage();

  }

  registrarUsuario(usuario: Usuario) {

    return this.http.post(this.url + '/usuario', usuario).pipe(

      map((res: any) => {

        Swal.fire({
          icon: 'success',
          title: 'Usuario creado correctamente',
          text: `Nuevo usuario: ${res.usuarioNew.nombre}`,
        });
        return true;
      })
    );
  }

  login(usuario: Usuario, recuerdame: boolean) {
    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(this.url + '/login', usuario).pipe(
      map((res: any) => {
        console.log(res);
        if (res.ok) {
          this.guardarStorage(res.usuario, res.token, res.menu);
          this.menu = res.menu;
          return true;
        } else {
          console.log(res);
          throw new Error('Error de logado');
        }
      }, catchError(err => {
        this.router.navigate(['/login']);
        Swal.fire('No se pudo Logar', 'error en base de datos' , 'error');
        return  Observable.throw(err);
      })));
  }

  loginGoogle(token: string) {
    return this.http.post(this.url + '/login/google', { idtoken: token }).pipe(
      map((res: any) => {
        this.guardarStorage(res.usuario, res.token, res.menu);
        this.menu = res.menu;
        return true;
      })
    );
  }

  guardarStorage(usuario: Usuario, token: string = this.token, menu: any) {
    // guardamos la info en localstorage y navegamos a dashboard
    localStorage.setItem('tokenApp', token);
    localStorage.setItem('usuarioApp', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    // guardamos la info en localstorage y navegamos a dashboard
    if (localStorage.getItem('tokenApp')) {
      this.usuario = JSON.parse(localStorage.getItem('usuarioApp'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
      this.token = localStorage.getItem('tokenApp');
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('tokenApp');
    localStorage.removeItem('usuarioApp');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);

  }

  renovarToken() {

   return this.http.get(this.url + '/login?token=' + this.token)
      .pipe(map((res: any) => {
            this.token = res.token;
            localStorage.setItem('token', this.token);

            return true;
      }),
      catchError(err => {
        this.router.navigate(['/login']);
        Swal.fire('No se pudo renovar el token','error en base de datos' , 'error');
        return  Observable.throw(err);
      })
      );

  }

  estaLogado() {
    return this.token.length > 5;
  }
}
