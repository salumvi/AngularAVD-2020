import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginRegisterService } from 'src/app/services/services/login-register.service';
import { Usuario } from 'src/app/models/usuario.models';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/services/usuario.service';
import { CargaArchivoService } from '../../services/services/carga-archivo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  archivo: File;

  imagenTemp;
  
  @ViewChild('input')
  myInput: ElementRef; 

constructor(private lrs: LoginRegisterService,
            private urs: UsuarioService,
            private sas: CargaArchivoService) { }

ngOnInit(): void {
  this.usuario = this.lrs.usuario;
}

guardar(usuario: Usuario) {
  this.usuario.nombre = usuario.nombre;
  if (!this.usuario.googleuser) {
    this.usuario.email = usuario.email;
  }

  this.urs.actualizarUsuario(this.usuario).subscribe(

    () => Swal.fire({
      icon: 'success',
      title: 'Usuario actualizado corectamente'
    })
  );

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

guardarImagenUsuario() {

  // validar el arhivoç

  this.sas.subirArchivo(this.archivo, 'usuarios', this.usuario._id)
    .subscribe((r) => {

    });
    // para borrar la seleccion del archivo
  this.myInput.nativeElement.value = '';
  this.imagenTemp = null;

}

}
