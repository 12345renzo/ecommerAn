import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Size } from '../../../types/tallasTypes';
import { sizes } from '../../../data/tallasMock';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UseOneProducto } from '../../../service/useOneProducto/use-one-producto';
import { Carrito } from '../../../service/carrito/carrito';
import { ToastrService } from 'ngx-toastr';
import { UseProductoService } from '../../../service/useProducto/use-producto';
import { CardProducto } from "../../../components/card-producto/card-producto";

@Component({
  selector: 'app-detalle-producto',
  imports: [NgClass, CardProducto],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleProductoComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  producto = inject(UseOneProducto);
  carrito = inject(Carrito);
  otrosProductos = inject(UseProductoService);

  tallas: Size[] = sizes;
  cantidad = signal<number>(1);
  tallaSeleccionada = signal<string | null>(null);
  codigo = signal<string | null>(null);
  index = signal<number>(1);

  productos = computed(() => this.producto.query.data());
  lengthImages = computed(() => this.productos()?.images.length ?? 0);
  isLoading = computed(() => this.producto.query.isPending());
  isError = computed(() => this.producto.query.isError());

  otrosProductosQuery = computed(() => this.otrosProductos.query.data()?.products ?? []);
  otrosProductosIsLoading = computed(() => this.otrosProductos.query.isPending());
  otrosProductosIsError = computed(() => this.otrosProductos.query.isError());

  mostrar5Productos = computed(() => {
    const productos = this.otrosProductosQuery();
    if (productos.length <= 5) {
      return productos;
    }
    return productos.slice(0, 5);
  });


  constructor() {
    this.route.params.pipe().subscribe((params) => {
      this.producto.codigo.set(params['id']);
      this.codigo.set(params['id']);
    });
  }

  //* funcion para elegir la img del producto
  elegirIndex(index: number){
    this.index.update(() => index);
  }

  //* funcion para aumentar la cantidad del producto
  aumentarCantidad(){
    if(this.cantidad() == this.productos()?.stock){
      return;
    }
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
    return (this.productos()?.price ?? 0) * this.cantidad();
  });

  agregarAlCarrito(){
    const producto = {
      id: this.productos()!.id,
      imagen: this.productos()!.images[0],
      title: this.productos()!.title,
      price: this.productos()!.price,
      cantidad: this.cantidad(),
      talla: this.tallaSeleccionada(),
      stock: this.productos()!.stock
    };
    this.carrito.llenarCarrito(producto);

    this.toastr.success('Producto agregado al carrito', 'Éxito');
    this.router.navigate(['/catalogo']);
  }
}
