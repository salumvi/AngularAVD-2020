import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }
  constructor(@Inject(DOCUMENT) private doc) {
    this.cargarAjustes();
   }


guardarAjustes(){
  localStorage.setItem('ajustesApp', JSON.stringify(this.ajustes));
}
cargarAjustes(){

  if(localStorage.getItem('ajustesApp')) {
    this.ajustes = JSON.parse(localStorage.getItem('ajustesApp'));
    this.aplicarTema(this.ajustes.tema);
  }
}

aplicarTema(tema: string){
  this.ajustes.tema = tema;
  this.ajustes.temaUrl = `assets/css/colors/${tema}.css`;
  this.doc.getElementById('tema').setAttribute('href', this.ajustes.temaUrl);
  this.guardarAjustes();
}


}

interface Ajustes {
  temaUrl: string;
  tema: string;
}