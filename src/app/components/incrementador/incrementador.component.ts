import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() progresoComponente = 50;
  @Input() leyendaComponent = 'leyenda';
  @Output() cambioValor: EventEmitter< number > = new EventEmitter();
  @ViewChild('inputProgress') inputProgress: ElementRef;
 

  constructor() { }

  ngOnInit(): void {
  }


  cambiarValor( valor: number){
   
    if ( this.progresoComponente >= 100 && valor > 0 ) {
      this.progresoComponente = 100;
      return ;
    }
    if (this.progresoComponente <= 0 && valor < 0 ) {
      this.progresoComponente = 0;
      return ;
    }
    this.progresoComponente = (this.progresoComponente + valor).valueOf();
    this.cambioValor.emit( this.progresoComponente);
    this.inputProgress.nativeElement.focus();
  }

  onChange( newValor: number ){

   // const elemntHtml: any = document.getElementsByName('progreso')[0];
  
    if(newValor >= 100) {
    this.progresoComponente = 100;
  } else if (newValor <= 0) {
    this.progresoComponente = 0;
  } else {
    this.progresoComponente = newValor;
  }

    this.inputProgress.nativeElement.value = this.progresoComponente;
  // elemntHtml.value = this.progresoComponente;
    this.cambioValor.emit( this.progresoComponente);
   

  }
  

}
