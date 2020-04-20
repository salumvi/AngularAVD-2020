import { Component, OnInit } from "@angular/core";
import { LoginRegisterService } from "src/app/services/services/login-register.service";
import { Usuario } from "src/app/models/usuario.models";

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
    if(!this.usuario.google){
    this.usuario.email = usuario.email;
    }
    console.log(this.usuario);

    this.lrs.actualizarUsuario(this.usuario).subscribe((u) => console.log(u));
  }
}
