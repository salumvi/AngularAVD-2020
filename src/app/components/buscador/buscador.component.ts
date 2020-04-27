import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: []
})
export class BuscadorComponent implements OnInit {


  @Input()
  estaCargando = false;

  @Output()
  emitirBuscar = new EventEmitter<string>();


  constructor() {

  }

  ngOnInit(): void {
  }

  buscar(valor: string){
    this.emitirBuscar.emit(valor);
  }

}
