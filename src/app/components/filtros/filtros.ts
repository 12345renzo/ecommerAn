import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { NgClass } from '@angular/common';
import { sizes } from '../../data/tallasMock';
import { Size } from '../../types/tallasTypes';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filtros',
  imports: [MatSliderModule, FormsModule, NgClass, MatRadioModule],
  templateUrl: './filtros.html',
  styleUrl: './filtros.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Filtros {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  tallas: Size[] = sizes;

  isMinPrice = signal<number>(Number(this.route.snapshot.queryParamMap.get('minPrice')));
  isMaxPrice = signal<number>(Number(this.route.snapshot.queryParamMap.get('maxPrice')));
  paran = signal<string[]>(this.route.snapshot.queryParamMap.getAll('sizes'));
  categoria = signal<string | null>(this.route.snapshot.queryParamMap.get('gender'));

  //*aki en el constructor me suscribo a lso cambios de param para estar actualizados y chapar el valor de la url o los mio
  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.isMinPrice.set(params.get('minPrice') ? Number(params.get('minPrice')) : 0);
      this.isMaxPrice.set(params.get('maxPrice') ? Number(params.get('maxPrice')) : 1000);
      this.paran.set(params.getAll('sizes'));
      const gender = params.get('gender');
      this.categoria.set(gender === 'default' ? 'default' : gender);
    });
  }

  //* este controla la aparicion del boton limpiar y filtrar
  isActiveClean = computed(
    () =>
      this.isMinPrice() > 0 ||
      this.isMaxPrice() < 1000 ||
      this.paran().length > 0 ||
      this.categoria() !== 'default',
  );

  //* limpia los filtros
  onCleanFilters() {
    this.isMinPrice.set(0);
    this.isMaxPrice.set(1000);
    this.paran.set([]);
    this.categoria.set('default');
    this.router.navigate([], {
      queryParams: {
        minPrice: null,
        maxPrice: null,
        sizes: null,
        gender: null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  //*aqui reecibe todos los valores y lo envia al param de la url
  onSendFilters() {
    this.router.navigate([], {
      queryParams: {
        minPrice: this.isMinPrice(),
        maxPrice: this.isMaxPrice(),
        sizes: this.paran(),
        gender: this.categoria(),
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  //* controla los botones de sizes segun eleccion y los marca
  toggleTalla(id: string) {
    if (this.paran().includes(id)) {
      this.paran.update((tallas) => tallas.filter((t) => t !== id));
      console.log(this.paran().length);
    } else {
      this.paran.update((tallas) => [...tallas, id]);
      console.log(this.paran().length);
    }
  }
}
