import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuscadorService } from '../../services/services/buscador.service';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-buscador-general',
  templateUrl: './buscador-general.component.html',
  styles: []
})
export class BuscadorGeneralComponent implements OnInit {

  parametro = '';
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];
  usuarios: Usuario[] = [];
  estaCargando = true;
  constructor(
    private rutaA: ActivatedRoute,
    private bs: BuscadorService) {

    //this.parametro = this.rutaA.snapshot.params.termino;
    this.rutaA.params.subscribe((params) => {
      this.parametro = params.termino;
      this.buscar(this.parametro);

    });


  }


  ngOnInit(): void {
  }


  buscar(parametro: string) {
    if (parametro === '') {
      return;
    }
    this.bs.buscardor(parametro)
      .subscribe((res: any) => {

        this.hospitales = res.hospitales;
        this.medicos = res.medicos;
        this.usuarios = res.usuarios;

        this.estaCargando = false;

      });

  }

}
