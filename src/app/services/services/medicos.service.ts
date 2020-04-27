import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { LoginRegisterService } from './login-register.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private http: HttpClient,
    private lrs: LoginRegisterService) { }


  cargarmedicos() {
    const url = environment.urlApi + '/medico';

    return this.http.get(url);
  }

  buscarMedicos(termino: string) {
    const url = environment.urlApi + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url).pipe(map((res: any) => res));
  }
  /**
   * Buscar por id de Medico
   * @param id : id del médico,
   * retorna una respuesta en formato: { ok: boolean, medico: Medico }
   */
  getByIdMedico(id: string) {
    const url = environment.urlApi + '/medico/' + id;

    return this.http.get(url);

  }

  borrarMedico(id: string) {
    const url = environment.urlApi + '/medico/' + id + '?token=' + this.lrs.token;
    return this.http.delete(url).pipe(map((r: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Medico Borrado correctamente',
        text: r.medico.nombre
      });
      return true;

    }));

  }

  /**
   * Crea un nuevo médico
   * @param nombre : string
   * @param hospitalId: string
   * devueve el médico nuevo
   */
  crearMedico(nombre: string, hospitalId: string) {
    const url = environment.urlApi + '/medico' + '?token=' + this.lrs.token;

    return this.http.post(url, { nombre, usuario: this.lrs.usuario._id, hospital: hospitalId })
      .pipe(map((r: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Medico creado correctamente',
          text: r.medicoNew.nombre
        });

        return r.medicoNew;
      }));

  }

  /**
   * Modifica el nombre y el hospital del médico
   * @param idMedico : Medico Id
   * @param nombreMedico : Nombre del Médico
   * @param hospitalId Id del Hospital
   * return observable<Medico>
   */
  modicicarMedico(idMedico: string, nombreMedico: string, hospitalId: string): Observable<any> {
    const url = environment.urlApi + '/medico/' + idMedico + '?token=' + this.lrs.token;

    return this.http.put(url, { nombre: nombreMedico, hospital: hospitalId })
      .pipe(map((res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Medico Modificado correctamente',
          text: res.medico.nombre
        });

        return res.medico;
      }));

  }

}
