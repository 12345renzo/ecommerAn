import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Carrito } from '../../../service/carrito/carrito';
import { RouterLink } from "@angular/router";
import { LucideChevronLeft, LucideTrash2 } from '@lucide/angular';
import { FormsModule } from '@angular/forms';
import { Size } from '../../../types/tallasTypes';
import { sizes } from '../../../data/tallasMock';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink, LucideChevronLeft,FormsModule, LucideTrash2],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarritoComponent {
  carrito = inject(Carrito);
  tallas: Size[] = sizes;


  total = computed(() => {
    let total = 0;
    this.carrito.datosCarrito().forEach((item) => {
      total += item.price * item.cantidad;
    });
    return total;
  });
}
