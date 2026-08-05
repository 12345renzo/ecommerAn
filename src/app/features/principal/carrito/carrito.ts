import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Carrito } from '../../../service/carrito/carrito';

@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarritoComponent {
  carrito = inject(Carrito);

  

}
