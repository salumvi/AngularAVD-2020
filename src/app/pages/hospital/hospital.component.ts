import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { HospitalService } from '../../services/services/hospital.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  cargando = false;
  totalHospitales = 0;
  hospitales: Hospital[] = [];
  constructor(private hs: HospitalService,
    private mus: ModalUploadService) {
    
      this.mus.notificacionimagen.subscribe(() => {
      this.cargarHospitales();
    });
  }

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales() {
    this.hs.cargarHospitales().subscribe((r) => {
      this.hospitales = r;
      this.totalHospitales = r.length;
    });
  }

  buscar(valor: string) {
    if (valor.length === 0) {

      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this.hs.buscarHospital(valor).subscribe((r) => {
      this.hospitales = r;
      this.cargando = false;
    });
  }

  borrarHospital(hospital: Hospital, i: number) {

    Swal.fire({
      title: '¿Seguro de Borrar el hospital?',
      text: 'Se va a proceder a borrar el hospital: ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {

      if (result.value) {

        this.hs.borrarHospital(hospital._id).subscribe();
        this.hospitales.splice(i, 1);
        this.totalHospitales--;
        // this.cargarUsuarios();
      }
    });

  }

  actualizarHospital(hospital: Hospital){

    this.hs.actualizarHospital(hospital).subscribe();
  }

  modificarImagen(hospital: Hospital) {

    this.mus.mostrarModal('hospitales', hospital._id);
  }

  crearHospital() {
    Swal.fire({
      title: 'Nombre del nuevo Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      preConfirm: (hospital) => {
        console.log(hospital);
        this.hs.crearHospital(new Hospital(hospital)).subscribe(() => {
          this.cargarHospitales();
        });

      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((res) => {
      if (res) {
        console.log(res);
      }
    });
  }
}
