import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Filtros } from "../../components/filtros/filtros";
import { CardProducto } from "../../components/card-producto/card-producto";
import { Producto } from "../../types/productoType";
import { productos } from "../../data/productoMock";
import { Paginator } from "../../components/paginator/paginator";

@Component({
  selector: 'app-catalogo',
  imports: [Filtros, CardProducto, Paginator],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogoComponent {

  datos: Producto[] = productos;

}