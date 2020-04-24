import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../models/usuario.models';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  private url = environment.urlApi;

  usuario: Usuario;
  token = '';

  constructor(private http: HttpClient, public router: Router) {
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
        this.guardarStorage(res.usuario, res.token);
        // this.router.navigate(['/login']);

        return true;
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(this.url + '/login/google', { idtoken: token }).pipe(
      map((res: any) => {
        this.guardarStorage(res.usuario, res.token);
        // this.router.navigate(['/login']);
        return true;
      })
    );
  }

  guardarStorage(usuario: Usuario, token: string = this.token) {
    // guardamos la info en localstorage y navegamos a dashboard
    localStorage.setItem('tokenApp', token);
    localStorage.setItem('usuarioApp', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    // guardamos la info en localstorage y navegamos a dashboard
    if (localStorage.getItem('tokenApp')) {
      this.usuario = JSON.parse(localStorage.getItem('usuarioApp'));
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
  }

  estaLogado() {
    return this.token.length > 5;
  }
}
