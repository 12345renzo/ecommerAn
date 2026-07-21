import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  imports: [NgClass],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Paginator {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  pageTotal = input<number>();
  constador = signal<number>(Number(this.route.snapshot.queryParamMap.get('page')));

  //*aki en el constructor me suscribo a lso cambios de param para estar actualizados y chapar el valor de la url o los mio
  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const page = params.get('page');
      this.constador.set(page === null ? 1 : Number(page));
    });
  }


  //*calcula la cantidad de paginas va aver
  paginas = computed(() => {
    const total = this.pageTotal() || 0;
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  //*control del boton retroceder
  anterior() {
    if (this.constador() === 1) {
      return;
    }
    this.constador.update((value) => value - 1);
    this.router.navigate([], {
          queryParams: {
            page: this.constador()
          },
          queryParamsHandling: 'merge',
        });
  }

  //*control del boton avanzar
  siguiente() {
    if (this.constador() === this.pageTotal()) {
      return;
    }
    this.constador.update((value) => value + 1);
    this.router.navigate([], {
          queryParams: {
            page: this.constador()
          },
          queryParamsHandling: 'merge',
        });
  }

  //*control de eleccion de page
  elegido(index: number) {
    this.constador.update(() => index);
    this.router.navigate([], {
          queryParams: {
            page: this.constador()
          },
          queryParamsHandling: 'merge',
        });
  }
}
