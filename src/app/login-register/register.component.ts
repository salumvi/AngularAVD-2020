import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRegisterService } from '../services/services/login-register.service';
import Swal from 'sweetalert2'
import { Usuario } from '../models/usuario.models';
import { Router } from '@angular/router';
declare function init_plugines();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./loginRegister.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  constructor(private registerSer: LoginRegisterService,
              private router: Router) { }

  ngOnInit(): void {
    init_plugines();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password1: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
    }, {
      validators: this.sonIguales('password1', 'password2') // validacion general del formulario
    })


    this.forma.setValue({
      nombre: 'usuario1',
      email: 'usuario1@gmail.com',
      password1: '123456',
      password2: '123456',
      condiciones: true
    });

  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const pass1: string = group.controls[campo1].value;
      const pass2: string = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      }
      return { sonIguales: true };
    }
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe aceptar las condiciones!',
      });
      return;
    }
    const usuario = new Usuario(this.forma.value.nombre, this.forma.value.email, this.forma.value.password1)

    this.registerSer.registrarUsuario(usuario).subscribe(
      () => this.router.navigate(['dashboard'])
      , e => {
        // este error vien del servidor
        Swal.fire({
          icon: 'error',
          title: 'Oops....',
          text: e.error.mensaje,
        });
      });
    ;
  }

}
