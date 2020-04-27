import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';
import { LoginRegisterService } from './login-register.service';



@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient,
    private lrs: LoginRegisterService
  ) { }



  cargarHospitales() {
    const url = environment.urlApi + '/hospital';
    return this.http.get(url).pipe(map((res: any) => {

      return res.hospitales;

    }));
  }

  obtenerHospital(id: string) {
    const url = environment.urlApi + '/hospital/' + id;
    return this.http.get(url).pipe(map((res: any) => {
      return res.hospital;
    }));
  }

  crearHospital(hospital: Hospital) {
    const url = environment.urlApi + '/hospital/?token=' + this.lrs.token;

    return this.http.post(url, hospital).pipe(map((res) => {
      
    }));
  }

  borrarHospital(id: string) {

    const url = environment.urlApi + '/hospital/' + id + '?token=' + this.lrs.token;
    return this.http.delete(url).pipe(map((r: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Hospital Borrado correctamente',
        text: r.nombre
      });
      return true;

    }));
  }

  buscarHospital(termino: string) {
    const url = environment.urlApi + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url).pipe(map((res: any) => res.hospitales));
  }
  actualizarHospital(hospital: Hospital) {
    const url = environment.urlApi + '/hospital/' + hospital._id + '?token=' + this.lrs.token;

    return this.http.put(url, hospital).pipe(map((r: any) => {

      Swal.fire({
        icon: 'success',
        title: 'Hospital Actualizado correctamente',
        text: r.nombre
      });
      return true;
    }));


  }




}
