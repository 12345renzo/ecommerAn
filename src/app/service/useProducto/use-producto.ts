import { inject, Injectable } from '@angular/core';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { GetAllProductService } from '../get-all-producto/get-all-product';

@Injectable({
  providedIn: 'root',
})

export class UseProductoService {
  getAllProducto = inject(GetAllProductService);
  queryClient = inject(QueryClient);

  query = injectQuery(() => ({
    queryKey: ['productos'],
    queryFn: () => this.getAllProducto.getAllProduct({limit: 9}),
    staleTime: 1000 * 60 * 5,
    retry: false,
  }));

}
