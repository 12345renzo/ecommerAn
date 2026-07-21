import { inject, Injectable, signal } from '@angular/core';
import { GetProducto } from '../get-producto/get-producto';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UseOneProducto {
  getProducto = inject(GetProducto);
  queryClient = inject(QueryClient);
  private route = inject(ActivatedRoute);

  codigo = signal<string | null>(this.route.snapshot.paramMap.get('id'));

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.codigo.set(params.get('id'));
    });
  }

  query = injectQuery(() => ({
    queryKey: ['producto', this.codigo()],
    queryFn: () => this.getProducto.getProduct(this.codigo() || ''),
    staleTime: 1000 * 60 * 5,
    retry: false,
  }))
}
