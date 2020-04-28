import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.models';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { LoginRegisterService } from '../../services/services/login-register.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalUsuarios;
  cargando = true;
  roles: any = environment.role;
  constructor(private us: UsuarioService,
              public mus: ModalUploadService,
              private lsr: LoginRegisterService) {
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.mus.notificacionimagen.subscribe((res: any) => {
      this.cargarUsuarios();
    });
  }


  cargarUsuarios() {
    this.cargando = true;
    this.us.cargarUsuarios(`${this.desde}`)
          .subscribe((res) => {
      this.usuarios = res.usuarios;
      this.totalUsuarios = res.total;
      this.cargando = false;

    });

  }

  cambiarDesde(valor: number) {
    let desde = this.desde;
    desde += valor;
    if (desde < 0) {
      return;
    }
    if (desde >= this.totalUsuarios) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }
  buscar(termino: string) {
    if(termino.length === 0 ){
      this.desde = 0;
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this.us.buscarUsuarios(termino).subscribe((res: Usuario[]) => {
        this.usuarios = res;
        this.totalUsuarios = res.length;
        this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario, i: number) {
    if (this.lsr.usuario._id === usuario._id) {
      Swal.fire('Error', 'No puede eliminar su Usuario', 'error');
      return ;
    }

    Swal.fire({
      title: '¿Seguro de Borrar al usuario?',
      text: 'Se va a proceder a borrar el usuario: ' + usuario.nombre ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {

      if (result.value) {

        this.us.borrarUsuario(usuario._id).subscribe();
        // esto se puede hacer de otra manera
        this.usuarios.splice(i, 1 );
        this.totalUsuarios--;
        // this.cargarUsuarios();
      }
    });

  }

  guardarUsuario(usuario: Usuario) {
    this.us.actualizarUsuario(usuario).subscribe();
  }


  modificarImagen(usuario: Usuario) {

    this.mus.mostrarModal('usuarios', usuario._id );
  }

}
