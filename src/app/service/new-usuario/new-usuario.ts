import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ResponseUsuarioType } from '../../types/responseUsuarioTypes';

@Injectable({
  providedIn: 'root',
})
export class NewUsuario {
  private http = inject(HttpClient);
  url = environment.apiUrl;

  //* aki para crear a un nuevo usuario
  async nuevoUsuario(nombre: string, correo: string, password: string): Promise<ResponseUsuarioType> {
    try {
      const datosNewUsuario = await lastValueFrom(
        this.http.post<ResponseUsuarioType>(`${this.url}/auth/register`, {
          email: correo,
          password: password,
          fullName: nombre,
        }),
      );

      return {
        ...datosNewUsuario,
        status: Boolean(datosNewUsuario.token),
      };
    } catch (error) {
      return {
        user: {
          id: "",
          email: "",
          fullName: "",
          isAdmin: false,
          roles: [],
        },
        token: "",
        status: false,
      };
    }
  }

}
