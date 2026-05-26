import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Producto } from '../../types/productoType';

@Component({
  selector: 'app-card-producto',
  imports: [],
  templateUrl: './card-producto.html',
  styleUrl: './card-producto.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProducto {
  producto = input<Producto>();
}
