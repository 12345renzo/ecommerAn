import { Injectable, signal } from '@angular/core';
import { CarritoDatosType } from '../../types/carritoDatosTypes';

@Injectable({
  providedIn: 'root',
})
export class Carrito {
  datosCarrito = signal<CarritoDatosType[]>([]);

  llenarCarrito(producto: CarritoDatosType){
    this.datosCarrito.update((prev) => [...prev, producto]);
  }
}
