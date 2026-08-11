import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ResponseUsuarioType } from '../../types/responseUsuarioTypes';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetUsuario {
  private http = inject(HttpClient);
  url = environment.apiUrl;

  //*aki logeo al user
  async getUsuario(correo: string, password: string): Promise<ResponseUsuarioType> {
    try {
      const datosUsuario = await lastValueFrom(
        this.http.post<ResponseUsuarioType>(`${this.url}/auth/login`, {
          email: correo,
          password: password,
        }),
      );

      return {
        ...datosUsuario,
        status: Boolean(datosUsuario.token),
      };
    } catch (error) {
      console.log(error);
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
