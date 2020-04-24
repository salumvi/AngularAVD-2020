import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/services/usuario.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  modal = true;

  archivo: File;

  imagenTemp;
  constructor(public us: UsuarioService,
    public mus: ModalUploadService) {

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
    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  guardarImagen() {

    this.us.subirArchivo(this.archivo, this.mus.tipo, this.mus.id)
      .subscribe((res) => {
        console.log(res);
        // emito la respuesta
        this.mus.notificacionimagen.emit(res);
        // cierro el modal
        this.cerrarModal();


      });



  }

  cerrarModal() {
    this.archivo = null;
    this.imagenTemp = null;
    this.mus.ocultarModal();

  }

}
