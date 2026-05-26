import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [NgClass],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Paginator {
  pageTotal = input<number>();
  constador = signal(1);

  paginas = computed(() => {
    const total = this.pageTotal() || 0;
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  anterior() {
    if (this.constador() === 1) {
      return;
    }
    this.constador.update((value) => value - 1);
    console.log(this.constador());
  }

  siguiente() {
    if (this.constador() === this.pageTotal()) {
      return;
    }
    this.constador.update((value) => value + 1);
    console.log(this.constador());
  }

  elegido(index: number) {
    this.constador.update(() => index);
  }
}
