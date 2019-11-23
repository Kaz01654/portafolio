import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productosIdx } from '../interfaces/productos_idx.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos_idx: productosIdx[] = [];
  productosFiltrado: productosIdx[] = [];
  cargando = true;

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise( ( resolve, reject ) => {
      this.http.get('https://angular-html-1c0ad.firebaseio.com/productos_idx.json')
      .subscribe( (resp: productosIdx[]) => {
        this.cargando = false;
        this.productos_idx = resp;
        resolve();
        // console.log(resp);
      });
    });
  }

  public getProducto(id: string) {
    return this.http.get(`https://angular-html-1c0ad.firebaseio.com/productos/${ id }.json`);
  }

  public buscarProducto(termino: string) {
    if (this.productos_idx.length === 0) {
      this.cargarProductos().then(() => {
        this.filtrarProductos( termino );
      });
    } else {
      this.filtrarProductos( termino );
    }
  }

  private filtrarProductos( termino: string) {
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos_idx.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if (prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0) {
        this.productosFiltrado.push( prod );
      }
    });
  }
}
