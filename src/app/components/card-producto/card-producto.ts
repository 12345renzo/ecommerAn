import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ProductoType } from '../../types/responseProductoTypes';
import { RouterLink } from "@angular/router";
import { LucideShoppingCart } from '@lucide/angular';
import { Carrito } from '../../service/carrito/carrito';

@Component({
  selector: 'app-card-producto',
  imports: [RouterLink, LucideShoppingCart],
  templateUrl: './card-producto.html',
  styleUrl: './card-producto.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProducto {
  carri = inject(Carrito);
  producto = input<ProductoType>();
  palCarrito = computed(() => {
    const p = this.producto();
    if (!p) return null; // todavía no llegó el producto

    return {
      id: p.id,
      imagen: p.images[0],
      title: p.title,
      price: p.price,
      cantidad: 1,
      talla: p.sizes[0],
      stock: p.stock,
    };
  });

  aver() {
  const item = this.palCarrito();
  if (!item) return; 

  this.carri.llenarCarrito(item);
}
}
