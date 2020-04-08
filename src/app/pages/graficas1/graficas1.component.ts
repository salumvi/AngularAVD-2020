import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { graficos } from './graficas.datos';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  
  graficosCom: any = graficos;
  
  constructor() { 
   
  }

  ngOnInit(): void {
  }

}
