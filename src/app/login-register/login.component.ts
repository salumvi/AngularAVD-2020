import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { LoginRegisterService } from "../services/services/login-register.service";
import Swal from "sweetalert2";

declare function init_plugines();
declare const gapi: any;



@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./loginRegister.component.css"],
})
export class LoginComponent implements OnInit {
  recuerdame = false;
  email:string;
  auth2: any;

  constructor(private router: Router,
               private sl: LoginRegisterService) {}

  ngOnInit(): void {
    init_plugines();
    this.googleInit();
        this.email = localStorage.getItem("email")|| '';
        if(this.email.length > 0) {
          this.recuerdame=true;
        }
  }


  /**
   * Calls startAuth after Sign in V2 finishes setting up.
   */
  googleInit(){

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '836680142681-v040um4bvesolt3qd3ij7hj5q650mrdu.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
    });

    this.attachSingin(document.getElementById('btnGoogle'));

  });
}

attachSingin(element) {

  this.auth2.attachClickHandler( element, {}, (googleUser) =>{

    //let profile= googleUser.getBasicProfile();
    let token = googleUser.getAuthResponse().id_token;

   
    this.sl.loginGoogle(token)
        .subscribe(()=> 
        //this.router.navigate(['/dashboard']) // este no lo carga bien
        //redireccionamiento manual
        window.location.href="#/dashboard"
        );

  });

}


  ingresar(forma: NgForm) {
    if (!forma.valid) {
      return;
    }
    this.sl.login(forma.value, forma.value.recuerdame).subscribe(
      () => this.router.navigate(['/dashboard'])
      ,
      (e) => {
        //este error viene del servidor
        Swal.fire({
          icon: 'error',
          title: 'Oops...Comp',
          text: e.error.mensaje,
        })
      }
    );
    
  }
}
