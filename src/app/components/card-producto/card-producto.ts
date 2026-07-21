import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductoType } from '../../types/responseProductoTypes';
import { RouterLink } from "@angular/router";
import { LucideShoppingCart } from '@lucide/angular';

@Component({
  selector: 'app-card-producto',
  imports: [RouterLink, LucideShoppingCart],
  templateUrl: './card-producto.html',
  styleUrl: './card-producto.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProducto {
  producto = input<ProductoType>();
}
