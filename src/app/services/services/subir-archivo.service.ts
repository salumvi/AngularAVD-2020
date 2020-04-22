import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { LoginRegisterService } from './login-register.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {


  url = environment.urlApi;
  constructor(private http: HttpClient,
              private lrs: LoginRegisterService ) { }

  public subirArchivo(archivo: File, tipo: string, id: string) {

    console.log(archivo);
    const formData = new FormData();
    formData.append('imagen', archivo);
    return this.http.put(this.url + '/upload/' + tipo + '/' + id, formData)
    .pipe( map((res: any) => {
      console.log(res);
      // tengo que controlar los errores

      this.lrs.usuario.img = res.usuario.img;
      this.lrs.guardarStorage(res.usuario);
      Swal.fire({
        icon: 'success',
        title: 'Foto Actualizado correctamente',
      });

      return true;
    }));

  }



}

