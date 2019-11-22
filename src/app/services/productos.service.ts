import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productosIdx } from '../interfaces/productos_idx.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos_idx: productosIdx[] = [];
  cargando = true;

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://angular-html-1c0ad.firebaseio.com/productos_idx.json')
    .subscribe( (resp: productosIdx[]) => {
      this.cargando = false;
      this.productos_idx = resp;
      console.log(resp);
    });
  }
}
