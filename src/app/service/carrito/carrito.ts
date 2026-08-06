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

  modificarCarrito(id:string, producto: CarritoDatosType){
    this.datosCarrito.update((prev) => 
      prev.map((item) => (item.id === id ? producto : item))
    );
  }

  actualizarCantidad(id: string | number, cantidad: number) {
    this.datosCarrito.update((items) =>
      items.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  }

  actualizarTalla(id: string | number, talla: string | null) {
    this.datosCarrito.update((items) =>
      items.map((item) => (item.id === id ? { ...item, talla } : item))
    );
  }

  eliminarOneCarrito(id:string | number){
    this.datosCarrito.update((prev) => prev.filter((item)=> item.id !== id));
  }

  eliminarCarrito(){
    this.datosCarrito.update((prev) => []);
  }
}
