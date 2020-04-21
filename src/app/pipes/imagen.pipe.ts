import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../environments/environment";

@Pipe({
  name: "imagen",
})
export class ImagenPipe implements PipeTransform {
  transform(urlImg: string, tipo: string = "usuario"): string {
    
    let url =environment.urlApi + '/img';

    if(!urlImg|| urlImg.length === 0){
       return  url + '/usuario/cualquierimagen';
    }
if(urlImg.startsWith('http')) {
  // es de google:
  return  urlImg;
}
    
    
    switch (tipo) {
      case "usuario":
        url += "/usuario/"+urlImg;
        break;
      case "medico":
        url += "/usuario/"+urlImg;
        break;
      case "hospital":
        url += "/usuario/"+urlImg;
        break;     
      default:
         url += '/usuario/xxx';
        break;
    }

    return url;

  }
}
