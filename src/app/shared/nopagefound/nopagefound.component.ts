import { Component, OnInit } from '@angular/core';
declare function init_plugines();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {
  
  anio: number;
  constructor() {
    this.anio = new Date().getFullYear();
   }

  ngOnInit(): void {
    init_plugines();
  }

}
