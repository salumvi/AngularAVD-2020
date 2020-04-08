import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {


  progreso1 = 5;
  progreso2 = 15;
  tituloProgress1 = 'Barra de progreso Azul';
  tituloProgress2 = 'Barra de progreso Negra';

  constructor() { }

  ngOnInit(): void {
  }


}
