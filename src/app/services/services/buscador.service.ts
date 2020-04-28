import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor(private http: HttpClient) { }


buscardor(termino: string) {
  const url: string = environment.urlApi + '/busqueda/' + termino;

  return this.http.get(url);

}


}


