import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { AcountSettingsComponent } from '../../pages/acount-settings/acount-settings.component';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;
  constructor(private route: Router,
              private title: Title,
              private meta: Meta) {

    this.getDateRoute().subscribe(data => {
      this.titulo = data.titulo;
      title.setTitle(this.titulo);
      // metatag informacion
      const metaTag: MetaDefinition = {
        name: 'descripcion',
        content: this.titulo + ' desc: ' + data.descripcion
      };

      this.meta.updateTag(metaTag);

    });





  }

  ngOnInit(): void {
  }



  getDateRoute() {
    return this.route.events.pipe(
      // filtro por los Activation End
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)

    );

  }

}
