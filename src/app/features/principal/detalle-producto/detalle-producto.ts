import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Size } from '../../../types/tallasTypes';
import { sizes } from '../../../data/tallasMock';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UseOneProducto } from '../../../service/useOneProducto/use-one-producto';

@Component({
  selector: 'app-detalle-producto',
  imports: [NgClass],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleProductoComponent {
  private route = inject(ActivatedRoute);
  datoProducto = inject(UseOneProducto);
  tallas: Size[] = sizes;
  cantidad = signal<number>(0);
  tallaSeleccionada = signal<string | null>(null);
  codigo = signal<string | null>(null);
  index = signal<number>(1);


  productos = computed(() => this.datoProducto.query.data());
  lengthImages = computed(() => this.productos()?.images.length ?? 0);
  isLoading = computed(() => this.datoProducto.query.isPending());
  isError = computed(() => this.datoProducto.query.isError());


  constructor() {
    this.route.params.pipe().subscribe((params) => {
      this.codigo.set(params['id']);
    });
  }

  //* funcion para cambiar la img del producto asi adelante
  aumentarIndex(){
    if(this.lengthImages() > this.index()){
      this.index.update((value) => value + 1);
    }
    else{
      this.index.update(() => 1);
    }
  }

  //* funcion para cambiar la img del producto asi atras
  disminuirIndex(){
    if(this.index() > 1){
      this.index.update((value) => value - 1);
    }
    else{
      this.index.update(() => this.lengthImages());
    }
  }

  //* funcion para elegir la img del producto
  elegirIndex(index: number){
    this.index.update(() => index);
  }

  //* funcion para aumentar la cantidad del producto
  aumentarCantidad(){
    this.cantidad.update((value) => value + 1);
  }

  //* funcion para disminuir la cantidad del producto
  disminuirCantidad(){
    if(this.cantidad() == 0){
      return;
    } 
    this.cantidad.update((value) => value - 1);
  }

  //* funcion para seleccionar la talla del producto
  seleccionTalla(id: string){
    if(this.tallaSeleccionada() == id){
      this.tallaSeleccionada.update(() => null);
      return;
    }
    this.tallaSeleccionada.update((value) => id);
  }

  botonAgregarDeshabilitado = computed(() => {
    const tieneTalla = this.tallaSeleccionada() !== null;
    const tieneCantidadValida = this.cantidad() > 0;
    return !tieneTalla || !tieneCantidadValida;
  });

  montoTotal = computed(() => {
    return this.cantidad() * 200;
  });

  agregarAlCarrito(){
    console.log(this.codigo());
  }
}
