import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductoType } from '../../types/responseProductoTypes';
import { lastValueFrom } from 'rxjs';

export type ProductoParaEditar = Partial<Omit<ProductoType, 'user'>> & { id: string | number };

export interface FileUpload {
  fileName: string;
  secureUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class UpdProducto {
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

  //* edita un producto con patch
  async updateProducto(producto: ProductoParaEditar): Promise<ProductoType> {
    try {
      const { id, images = [], ...rest } = producto;

      // separa las que ya existen (http) de las nuevas (base64)
      const existentes = images
        .filter((img) => img.includes('http'))
        .map((img) => img.split('/').pop() || '');

      const nuevas = images.filter((img) => !img.includes('http'));

      // solo sube las nuevas
      const subidas = nuevas.length > 0 ? await this.exportFile(nuevas) : [];

      const imagenesToSave = [...existentes, ...subidas];

      const data = await lastValueFrom(
        this.http.patch<ProductoType>(`${this.url}/products/${id}`, {
          ...rest,
          images: imagenesToSave,
        }),
      );

      return {
        ...data,
        images: data.images?.map((img) => `${this.url}/files/product/${img}`) ?? [],
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

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
