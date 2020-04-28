import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { LoginRegisterService } from './login-register.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  url: string = environment.urlApi;
  usuario: Usuario;
  constructor(private http: HttpClient,
    private lrs: LoginRegisterService) {
    this.usuario = lrs.usuario;
  }

  // /**
  //  * Subir archivo de imagen
  //  * @param archivo;
  //  * @param tipo;
  //  * @param id;
  //  */
  // public subirArchivo(archivo: File, tipo: string, id: string) {


  //   const formData = new FormData();
  //   formData.append('imagen', archivo);
  //   return this.http.put(this.url + '/upload/' + tipo + '/' + id, formData)
  //     .pipe(map((res: any) => {

  //       // tengo que controlar los errores
  //       if (tipo === 'usuario') {
  //         this.lrs.usuario.img = res.usuario.img;
  //         this.lrs.guardarStorage(res.usuario);
  //       }

  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Foto Actualizado correctamente',
  //       });

  //       return true;
  //     }));

  // }


  actualizarUsuario(usuario: Usuario) {
    return this.http
      .put(
        this.url + '/usuario/' + usuario._id + '?token=' + this.lrs.token,
        usuario
      )
      .pipe(
        map((res: any) => {
          // Solo modificaré el storage si soy yo
          if (usuario._id === this.usuario._id) {
            this.lrs.guardarStorage(res.usuario, this.lrs.token, this.lrs.menu);
          }

          Swal.fire({
            icon: 'success',
            title: 'Usuario Actualizado correctamente',
            text: res.usuario.nombre
          });

          return true;
        })
      );
  }

  cargarUsuarios(desde: string = '') {

    let url = this.url + '/usuario';
    if (desde.length > 0) {
      url += '?desde=' + desde;
    }

    return this.http.get(url)
      .pipe(map((res: any) => {
        return res;
      }));

  }

  buscarUsuarios(termino: string) {
    const url = this.url + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url).pipe(map((res: any) => res.usuarios));
  }

  borrarUsuario(id: string) {

    const url = this.url + '/usuario/' + id + '?token=' + this.lrs.token;
    return this.http.delete(url).pipe(map((r: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Usuario Borrado correctamente',
        text: r.usuario.nombre
      });
      return true;

    }));
  }

}



