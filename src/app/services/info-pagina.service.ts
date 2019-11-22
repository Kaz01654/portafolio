import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { infoPagina } from '../interfaces/info-pagina.interface';
import { infoAbout } from '../interfaces/info-about.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: infoPagina = {};
  infoEquipo: infoAbout[] = [];
  cargada = false;

  constructor(private http: HttpClient) { 
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: infoPagina) => {
      this.cargada = true;
      this.info = resp;
      // console.log(resp);
    });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-1c0ad.firebaseio.com/equipo.json')
    .subscribe( (resp: infoAbout[]) => {
      this.cargada = true;
      this.infoEquipo = resp;
      // console.log(resp);
    });
  }
}
