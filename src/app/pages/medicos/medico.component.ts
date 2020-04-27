import { Component, OnInit, ViewChild } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import { NgForm } from '@angular/forms';
import { HospitalService } from '../../services/services/hospital.service';
import { MedicosService } from '../../services/services/medicos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  medico: Medico;
  hospital: Hospital;
  hospitales: Hospital[] = [];
  param: string;
  constructor(private hs: HospitalService,
              private ms: MedicosService,
              private rutaActiva: ActivatedRoute,
              private mus: ModalUploadService,
              private route: Router) {
    // para cargar uno vacío y no de errores
    // Luego en el Oninit lo relleno
    this.medico = new Medico('', null, null, new Hospital('', '', ''));
    this.hospital = new Hospital('','','');
    this.mus.notificacionimagen.subscribe((r) => {
      this.medico.img = r;
    });

  }

  ngOnInit(): void {
    this.param = this.rutaActiva.snapshot.params.param;
    if (this.param !== 'nuevo') {

      this.ms.getByIdMedico(this.param).subscribe((res: any) => {
        if (res.ok) {
          this.medico = new Medico(res.medico.nombre,
            res.medico.img,
            '',
            new Hospital('', res.medico.hospital.img, res.medico.hospital._id),
            res.medico._id);

          this.cambioHospital(res.medico.hospital._id);
        }
      });
    }
    this.cargarHospitales();
  }

  cargarHospitales(){

    this.hs.cargarHospitales().subscribe((h) => {

      this.hospitales = h;
    });
  }
  modificarImagen(medico: Medico) {
    if(this.rutaActiva.snapshot.params.param === 'nuevo') {
      Swal.fire('Debe crear un nuevo Médico', 'De al boton de guardar', 'error');
      return;
    }

    this.mus.mostrarModal('medicos', this.medico._id);

  }
  guardarMedico(f: NgForm) {

    this.param = this.rutaActiva.snapshot.params.param;
    if (!f.valid) {
      console.log('Formuario NO valido');
      return;
    }

    if (this.param === 'nuevo') {

      this.ms.crearMedico(f.value.nombre, f.value.hospital)
        .subscribe((m)=>{
          this.medico._id = m._id;
          this.route.navigateByUrl('/medico/' + m._id);
//          this.cambioHospital(m.hospital);
        });
    } else {

      this.ms.modicicarMedico(this.param, f.value.nombre, f.value.hospital)
        .subscribe((m: any)=>{
          this.cambioHospital(m.hospital);
         
        });

    }
    // 
    
  }

cambioHospital(idHospital: string ){

  this.hs.obtenerHospital(idHospital).subscribe((h)=>{
    this.hospital = h;

  });

}  
  

}
