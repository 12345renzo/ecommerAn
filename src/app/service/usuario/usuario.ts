import { Inject, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const user = this.cargarUsuario();
      if (user) this.useri.set(user);
    }
  }

  private cargarUsuario(): ResponseUsuarioType | null {
    const token = localStorage.getItem('token');
    const userRaw = localStorage.getItem('user');
    if (token && userRaw) {
      try {
        const user = JSON.parse(userRaw);
        return { user, token, status: true };
      } catch {
        return null;
      }
    }
    return null;
  }

  private guardarUsuario(datos: ResponseUsuarioType) {
    localStorage.setItem('token', datos.token);
    localStorage.setItem('user', JSON.stringify(datos.user));
  }

  async login(correo: string, password: string): Promise<boolean> {
    const datosUsuario = await this.getUsuario.getUsuario(correo, password);
    if (datosUsuario.status && datosUsuario.token) {
      this.useri.set(datosUsuario);
      this.guardarUsuario(datosUsuario);
      return true;
    }
    return false;
  }

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.useri.set(null);
  }

  async register(nombre: string, correo: string, password: string): Promise<boolean> {
    const datosNuevoUsuario = await this.nuevoUsuario.nuevoUsuario(nombre, correo, password);
    if (datosNuevoUsuario.status && datosNuevoUsuario.token) {
      this.useri.set(datosNuevoUsuario);
      this.guardarUsuario(datosNuevoUsuario);
      return true;
    }
    return false;
  }
}
