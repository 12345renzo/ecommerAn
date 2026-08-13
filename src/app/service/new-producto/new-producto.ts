import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductoType } from '../../types/responseProductoTypes';
import { lastValueFrom } from 'rxjs';

type ProductoSinId = Omit<ProductoType, 'id' | 'user'>;

export interface FileUpload {
  fileName: string;
  secureUrl: string;
}

@Injectable({
  providedIn: 'root',
})

export class NewProducto {
  private http = inject(HttpClient);
  url = environment.apiUrl;

  //* sube las imagenes (base64) y devuelve los nombres que asigna el back
  async exportFile(imagenes: string[]): Promise<string[]> {
    const uploadsPromises = imagenes.map(async (image) => {
      const formData = new FormData();
      formData.append('file', this.base64ToBlob(image), `imagen-${Date.now()}.png`);
      const data = await lastValueFrom(
        this.http.post<FileUpload>(`${this.url}/files/product`, formData),
      );
      return data.fileName;
    });
    return Promise.all(uploadsPromises);
  }

  //* aki mandamos el post para agregar un producto
  async addProducto(producto: ProductoSinId): Promise<ProductoType>{
    try {
      //* sube las imagenes y reemplaza el base64 por el nombre asignado
      const imagenesNuevas = await this.exportFile(producto.images ?? []);
      const productoBody = { ...producto, images: imagenesNuevas };

      const agregarProducto = await lastValueFrom(
        this.http.post<ProductoType>(`${this.url}/products`, productoBody)
      );

      return{
        ...agregarProducto,
        images: agregarProducto.images?.map((img) => `${this.url}/files/product/${img}`) ?? [],
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //* convierte un data url (base64) a blob para subirlo por formdata
  private base64ToBlob(dataUrl: string): Blob {
    const [meta, data] = dataUrl.split(',');
    const mime = meta.match(/data:(.*?);/)?.[1] ?? 'image/png';
    const bin = atob(data);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      arr[i] = bin.charCodeAt(i);
    }
    return new Blob([arr], { type: mime });
  }
}
