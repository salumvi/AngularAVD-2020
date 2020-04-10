import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {

    
    // this.devuelveObservable().pipe(retry(2))
    // .subscribe(
    //   next => console.log('funcion next ', next),
    //   error => console.error('funcion error', error),
    //   () => console.log('el trabajo se terminó')
    //   );
      
   }

  ngOnInit(): void {
  }

devuelveObservable(): Observable<number> {
  return  new Observable(observer => {

    let contador = 0;
    const interval = setInterval(() => {
      contador ++;
      console.log(contador);
      if(contador === 3){
        observer.next(contador);
        clearInterval(interval);
      }
      if(contador === 2 ) {
        observer.error(contador);
        // clearInterval(interval);
      }
    }, 1000);
  });

}




}
