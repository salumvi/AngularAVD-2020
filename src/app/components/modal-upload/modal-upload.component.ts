import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/services/usuario.service';
import { ModalUploadService } from './modal-upload.service';
import { CargaArchivoService } from '../../services/services/carga-archivo.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  modal = true;

  archivo: File;

  @ViewChild('input')
  myInput: ElementRef;

  imagenTemp;
  constructor(public us: UsuarioService,
              public mus: ModalUploadService,
              private cas: CargaArchivoService) {

  }

  ngOnInit(): void {
  }

  seleccionaImagen(file: File) {

    if (!file) {
      this.archivo = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      Swal.fire('Archivo incorrecto', 'No es un archivo de imagen', 'error');
      return;
    }

    this.archivo = file;

    // cargar el archivo temporal
    const reader = new FileReader();
    const urlTem = reader.readAsDataURL(file);
    reader.onloadend = () => {this.imagenTemp = reader.result;
    };

  }

  guardarImagen() {

    this.cas.subirArchivo(this.archivo, this.mus.tipo, this.mus.id)
      .subscribe((res) => {
        // emito la respuesta
        this.mus.notificacionimagen.emit(res);
        // cierro el modal
        this.cerrarModal();


      });



  }

  cerrarModal() {

    this.archivo = null;
    this.imagenTemp = null;
    this.myInput.nativeElement.value = '';
    this.mus.ocultarModal();

  }

}
