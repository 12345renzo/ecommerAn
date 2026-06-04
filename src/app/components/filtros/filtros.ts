import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { NgClass } from '@angular/common';
import { sizes } from '../../data/tallasMock';
import { Size } from '../../types/tallasTypes';


@Component({
  selector: 'app-filtros',
  imports: [MatSliderModule, FormsModule, NgClass],
  templateUrl: './filtros.html',
  styleUrl: './filtros.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Filtros {
  isActiveClean: boolean = false;
  isMinPrice: number = 0;
  isMaxPrice: number = 1000;
  tallas: Size[] = sizes;
  paran: string[] = [];

  toggleFiltros() {
    this.isActiveClean = !this.isActiveClean;
  }

  toggleTalla(id: string) {
    if(this.paran.includes(id)) {
      this.paran = this.paran.filter(item => item !== id);
      console.log('se quito');
    } else {
      this.paran.push(id);
      console.log('se agrego');
    }
  }
}
