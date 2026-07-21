import { computed, inject, Injectable, signal } from '@angular/core';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { GetAllProductService } from '../get-all-producto/get-all-product';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UseProductoService {
  getAllProducto = inject(GetAllProductService);
  queryClient = inject(QueryClient);
  private route = inject(ActivatedRoute);

  // 1. Valores iniciales desde el snapshot (sincrónico, evita un fetch extra)
  minPrice = signal<string | null>(this.route.snapshot.queryParamMap.get('minPrice'));
  maxPrice = signal<string | null>(this.route.snapshot.queryParamMap.get('maxPrice'));
  sizes = signal<string[]>(this.route.snapshot.queryParamMap.getAll('sizes'));
  gender = signal<string | null>(this.route.snapshot.queryParamMap.get('gender'));
  page = signal<string | null>(this.route.snapshot.queryParamMap.get('page'));
  q = signal<string | null>(this.route.snapshot.queryParamMap.get('q'));
  
  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.minPrice.set(params.get('minPrice'));
      this.maxPrice.set(params.get('maxPrice'));
      this.sizes.set(params.getAll('sizes'));
      const gender = params.get('gender');
      this.gender.set(gender === 'default' ? null : gender);
      const page = params.get('page');
      this.page.set(page === null ? '1' : page);
      this.q.set(params.get('q'));
    });
  }
  
  offset = computed(() => ((Number(this.page()) - 1 )* 9));
  
  query = injectQuery(() => ({
    queryKey: [
      'productos',
      {
        offset: this.offset(),
        tallas: this.sizes(),
        gender: this.gender(),
        minPrice: this.minPrice(),
        maxPrice: this.maxPrice(),
        q: this.q(),
      },
    ],
    queryFn: () =>
      this.getAllProducto.getAllProduct({
        limit: 9,
        offset: this.offset(),
        minPrice: this.minPrice() ? Number(this.minPrice()) : undefined,
        maxPrice: this.maxPrice() ? Number(this.maxPrice()) : undefined,
        sizes: this.sizes().length > 0 ? this.sizes().join(',') : undefined,
        gender: this.gender() || undefined,
        q: this.q() || undefined,
      }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  }));
}
