import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { ProductoType } from '../../types/responseProductoTypes';

@Injectable({
  providedIn: 'root',
})
export class GetProducto {
  private http = inject(HttpClient);
  url = environment.apiUrl;

  //*aki traigo un producto
  async getProduct(id: string): Promise<any> {
    const datoProducto = await lastValueFrom(
      this.http.get<ProductoType>(`${this.url}/products/${id}`),
    );

    return {
      ...datoProducto,
      images: datoProducto.images?.map((img) => `${this.url}/files/product/${img}`) ?? [],
      };
  }
}
