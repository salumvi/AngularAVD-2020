import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario.models';
import { HttpClient } from '@angular/common/http';
import { LoginRegisterService } from './login-register.service';

@Injectable({
  providedIn: 'root'
})
export class CargaArchivoService {

  url = environment.urlApi;
  usuario: Usuario;
  constructor(private http: HttpClient,
    private lrs: LoginRegisterService) {
    this.usuario = lrs.usuario;
  }

  /**
   * Subir archivo de imagen devuelvo el nombre del archivo
   * @param archivo;
   * @param tipo;
   * @param id;
   */
  public subirArchivo(archivo: File, tipo: string, id: string) {


    const formData = new FormData();
    formData.append('imagen', archivo);
    return this.http.put(this.url + '/upload/' + tipo + '/' + id, formData)
      .pipe(map((res: any) => {
        
        let img: string;
        // tengo que controlar los errores
        if (tipo === 'usuarios') {
          img = res.usuario.img;
          this.lrs.usuario.img = res.usuario.img;
          this.lrs.guardarStorage(res.usuario);
        }
        if (tipo === 'medicos') {
          img = res.medico.img;
        }
        if (tipo === 'hospitales') {
          img = res.hospital.img;
        }
        Swal.fire({
          icon: 'success',
          title: 'Foto Actualizado correctamente',
        });

        return img;
      }));

  }
}
