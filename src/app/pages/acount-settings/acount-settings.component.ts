import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-acount-settings',
  templateUrl: './acount-settings.component.html',
  styleUrls: ['./acount-settings.component.css']
})
export class AcountSettingsComponent implements OnInit {

  constructor( private ajustesServ: SettingsService) {
                this.ajustesServ.cargarAjustes();
               }

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarcolor(event, tema: string, link) {

    this.ajustesServ.aplicarTema(tema);
    // en este caso el event.target y el link es lo mismo, da igual trabajar con uno que con otro
    // console.log(event.target);
    // console.log(link);

    const selectores: any = document.getElementsByClassName('selector');

    // eliminamos la clase
    for (const ref of selectores) {
      ref.classList.remove('working');
    }

    event.target.classList.add('working');
    // o tambien valdría esto:
    // link.classList.add('working')
  }

  colocarCheck(){
    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores) {
      
      if(ref.getAttribute('data-theme') === this.ajustesServ.ajustes.tema ){
      ref.classList.add('working');
      break;
      }
    }
    
  }

}
