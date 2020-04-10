import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    // this.contarTres().then(() => {
    //   console.log('Terminó la promesa');
    // }).catch(err => console.error('Error en la promesa', err));


  }

  ngOnInit(): void {
  }

  contarTres(): Promise<boolean> {
    return  new Promise((resolve, reject) => {

      let contador = 0;
      const intevalo = setInterval(() => {
        contador = Math.random() * 10;
        console.log(contador);
        if (contador >= 5) {

          resolve(true);
          clearInterval(intevalo);
        }
        if (contador < 5) {
          reject(false);
          clearInterval(intevalo);
        }
      }, 1000);
    });
  }

}
