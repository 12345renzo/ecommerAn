import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Size } from '../../../types/tallasTypes';
import { sizes } from '../../../data/tallasMock';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-detalle-producto',
  imports: [NgClass],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleProductoComponent {
  tallas: Size[] = sizes;
  cantidad = signal<number>(0);
  tallaSeleccionada = signal<string | null>(null);

  aumentarCantidad(){
    this.cantidad.update((value) => value + 1);
  }

  disminuirCantidad(){
    if(this.cantidad() == 0){
      return;
    } 
    this.cantidad.update((value) => value - 1);
  }

  seleccionTalla(id: string){
    if(this.tallaSeleccionada() == id){
      this.tallaSeleccionada.update(() => null);
      return;
    }
    this.tallaSeleccionada.update((value) => id);
  }
}
