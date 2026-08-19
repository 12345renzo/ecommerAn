import { inject, Injectable, signal } from '@angular/core';
import { GetProducto } from '../get-producto/get-producto';
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UseOneProducto {
  getProducto = inject(GetProducto);
  queryClient = injectQueryClient();
  private route = inject(ActivatedRoute);

  codigo = signal<string | null>(this.route.snapshot.paramMap.get('id'));

  query = injectQuery(() => ({
    queryKey: ['producto', this.codigo()],
    queryFn: () => this.getProducto.getProduct(this.codigo() || ''),
    staleTime: 1000 * 60 * 5,
    retry: false,
  }))
}
