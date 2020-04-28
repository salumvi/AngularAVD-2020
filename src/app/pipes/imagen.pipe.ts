import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(urlImg: string, tipo: string = 'usuarios'): string {

    let url: string = environment.urlApi + '/img';

    if (!urlImg || urlImg.length === 0) {
      return url + '/usuarios/cualquierimagen';
    }
    if (urlImg.startsWith('http')) {
      // es de google:
      return urlImg;
    }


    switch (tipo) {
      case 'usuarios':
        url += '/usuarios/' + urlImg;
        break;
      case 'medicos':
        url += '/medicos/' + urlImg;
        break;
      case 'hospitales':
        url += '/hospitales/' + urlImg;
        break;
      default:
        url += '/usuarios/cualquierimagen';
        break;
    }

    return url;

  }
}
