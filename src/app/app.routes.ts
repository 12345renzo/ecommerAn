import { Routes } from '@angular/router';
import { LayoutPrincipal } from './layout/layout-principal/layout-principal';
import { HomeComponent } from './features/home/home';
import { LayoutAuth } from './layout/layout-auth/layout-auth';
import { LayoutAdmin } from './layout/layout-admin/layout-admin';

export const routes: Routes = [
  {
    path: '',
    component: LayoutPrincipal,
    children: [
      { path: '', component: HomeComponent }, // index
      //{ path: 'search', component: SearchComponent },
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
