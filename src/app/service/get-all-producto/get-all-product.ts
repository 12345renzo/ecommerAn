import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ParamProductType } from '../../types/paramProductType';
import { ResponseProductoType } from '../../types/responseProductoTypes';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetAllProductService {
  private http = inject(HttpClient);
  url = environment.apiUrl;

  //aki traigo todo
  async getAllProduct({
    limit,
    offset,
    sizes,
    gender,
    minPrice,
    maxPrice,
    q,
  }: ParamProductType): Promise<ResponseProductoType> {

    function cleanParams(
      obj: Record<string, any>,
    ): Record<string, string | number | boolean | string[]> {
      return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== ''),
      );
    }

    const params = new HttpParams({
      fromObject: cleanParams({ limit, offset, sizes, gender, minPrice, maxPrice, q }),
    });

    const datosProductos = await lastValueFrom(
      this.http.get<ResponseProductoType>(`${this.url}/products`, { params }),
    );

    const imgProducto = datosProductos.products.map((producto) => ({
      ...producto,
      images: producto.images?.map((img) => `${this.url}/files/product/${img}`) ?? [],
    }));

    return {
      ...datosProductos,
      products: imgProducto,
    };
  }
}
