import { Component, OnInit } from "@angular/core";
import { LoginRegisterService } from "src/app/services/services/login-register.service";
import { Usuario } from "src/app/models/usuario.models";
import Swal from 'sweetalert2';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  constructor(private lrs: LoginRegisterService) {}

  ngOnInit(): void {
    this.usuario = this.lrs.usuario;
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if(!this.usuario.googleuser){
    this.usuario.email = usuario.email;
    }

    this.lrs.actualizarUsuario(this.usuario).subscribe(
()=>   Swal.fire({
        icon: "success",
        title: "Usuario actualizado corectamente"
              })
    );
  }
}
