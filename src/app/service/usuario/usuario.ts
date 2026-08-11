import { inject, Injectable, signal } from '@angular/core';
import { GetUsuario } from '../get-usuario/get-usuario';
import { ResponseUsuarioType } from '../../types/responseUsuarioTypes';
import { NewUsuario } from '../new-usuario/new-usuario';

@Injectable({
  providedIn: 'root',
})
export class Usuario {
  getUsuario = inject(GetUsuario);
  nuevoUsuario = inject(NewUsuario);
  useri = signal<ResponseUsuarioType | null>(null);

  async login(correo: string, password: string): Promise<boolean> {
    const datosUsuario = await this.getUsuario.getUsuario(correo, password);
    this.useri.set(datosUsuario);
    if (datosUsuario.status && datosUsuario.token) {
      localStorage.setItem('token', datosUsuario.token);
      return true;
    }
    return false;
  }

  async logout() {
    localStorage.removeItem('token');
    this.useri.set(null);
  }

  async register(nombre: string, correo: string, password: string): Promise<boolean> {
    const datosNuevoUsuario = await this.nuevoUsuario.nuevoUsuario(nombre, correo, password);
    this.useri.set(datosNuevoUsuario);
    if (datosNuevoUsuario.status && datosNuevoUsuario.token) {
      localStorage.setItem('token', datosNuevoUsuario.token);
      return true;
    }
    return false;
  }

}
