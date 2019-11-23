import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { productoCompleto } from '../../interfaces/producto-completo.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  productoData: productoCompleto;
  id: string;

  constructor( private route: ActivatedRoute, 
               public productoService: ProductosService) {}

  ngOnInit() {
    this.route.params.subscribe( parametros =>{
      this.productoService.getProducto(parametros['id'])
      .subscribe( (producto: productoCompleto) => {
        this.id = parametros['id'];
        this.productoData = producto;
      });
    });
  }
}
