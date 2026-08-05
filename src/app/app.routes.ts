import { Routes } from '@angular/router';
import { LayoutPrincipal } from './layout/layout-principal/layout-principal';
import { HomeComponent } from './features/principal/home/home';
import { LayoutAuth } from './layout/layout-auth/layout-auth';
import { LayoutAdmin } from './layout/layout-admin/layout-admin';
import { CatalogoComponent } from './features/principal/catalogo/catalogo';
import { ColeccionesComponent } from './features/principal/colecciones/colecciones';
import { DetalleProductoComponent } from './features/principal/detalle-producto/detalle-producto';
import { AcercaComponent } from './features/principal/acerca/acerca';
import { CarritoComponent } from './features/principal/carrito/carrito';

export const routes: Routes = [
  {
    path: '',
    component: LayoutPrincipal,
    children: [
      { path: '', component: HomeComponent }, // index
      { path: 'catalogo', component: CatalogoComponent }, //catalogo
      { path: 'catalogo/:id', component: DetalleProductoComponent }, //detalle producto
      { path: 'colecciones', component: ColeccionesComponent }, //colecciones
      { path: 'carrito', component: CarritoComponent }, //carrito
      { path: 'acerca', component: AcercaComponent }, //acerca
    ],
  },
  {
    path: 'auth',
    component: LayoutAuth,
    children: [],
  },
  {
    path: 'admin',
    component: LayoutAdmin,
    children: [],
  }
];
