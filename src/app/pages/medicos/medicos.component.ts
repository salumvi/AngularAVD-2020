import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicosService } from '../../services/services/medicos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  cargando = false;
  totalMedicos = 0;
  medicos: Medico[] = [];

  constructor(private ms: MedicosService) {
    this.cargarMedicos();
   }

  ngOnInit(): void {
  }

  cargarMedicos() {
    this.ms.cargarmedicos().subscribe((res: any ) => {
      this.totalMedicos = res.total;
      this.medicos = res.medicos;
    });
  }

  buscar(termino: string) {
    if(termino.length === 0 ){
      this.cargarMedicos();
      return;
    }

    this.cargando = true;
    this.ms.buscarMedicos(termino).subscribe((res) => {
        this.medicos = res.medicos;
        this.totalMedicos = res.total;
        this.cargando = false;
    });
  }

  borrarMedico(medico: Medico, i: number){



    Swal.fire({
      title: '¿Seguro de Borrar al Medico?',
      text: 'Se va a proceder a borrar el medico: ' + medico.nombre ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {

      if (result.value) {

        this.ms.borrarMedico(medico._id).subscribe();
        // esto se puede hacer de otra manera
        this.medicos.splice(i, 1 );
        this.totalMedicos--;
        // this.cargarUsuarios();
      }
    });
  }
  crearMedico() {

  }

  modificarImagen(medico: Medico) {

  }
  actualizarMedico(medico: Medico) {

  } 
}
