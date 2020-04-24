import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  // este servicio se crea porque está disponible para toda la aplicación
  // sirve de punto intermedio y evita crear @inputs y @outpus


  // para argar imagenes para los distintos tipos
  tipo: string;
  id: string;
  oculto = 'oculto';

  notificacionimagen = new EventEmitter<any>();

  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;

  }

  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.tipo = tipo;
    this.id = id;

  }



}
