import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { Filtros } from "../../../components/filtros/filtros";
import { CardProducto } from "../../../components/card-producto/card-producto";
import { Paginator } from "../../../components/paginator/paginator";
import { UseProductoService } from "../../../service/useProducto/use-producto";

@Component({
  selector: 'app-catalogo',
  imports: [Filtros, CardProducto, Paginator],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogoComponent {
  datosProducto = inject(UseProductoService);

  datoss = computed(() => this.datosProducto.query.data() ?? []);
  productos = computed(() => this.datosProducto.query.data()?.products ?? []);
  isLoading = computed(() => this.datosProducto.query.isPending());
  isError = computed(() => this.datosProducto.query.isError());

}