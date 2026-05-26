import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LucideChevronLeft, LucideChevronRight, LucideSparkle } from '@lucide/angular';
import { HomePrincipal } from '../../../types/homePrincipal';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { CardGeneral } from '../../../types/cardGeneral';
import { CardComponent } from "../../../components/home/card-component/card-component";
import { DatosCardGeneral, DatosCardSecundario } from '../../../data/dataCardMock';
import { DatosCarrusel } from '../../../data/carruselMock';

@Component({
  selector: 'app-home',
  imports: [LucideChevronLeft, LucideChevronRight, RouterLink, NgClass, CardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  cambiarIndex: number = 1;
  datos: HomePrincipal[] = DatosCarrusel;
  cardPrincipal: CardGeneral[] = DatosCardGeneral;
  cardSecu: CardGeneral[] = DatosCardSecundario;
  intervalo: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.intervalo = setInterval(() => {
        this.cambiarIndexSiguiente();
        this.cdr.markForCheck();
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  cambiarIndexSiguiente() {
    if (this.cambiarIndex === 4) {
      this.cambiarIndex = 1;
      return;
    }
    this.cambiarIndex++;
  }

  cambiarIndexAnterior() {
    if (this.cambiarIndex === 1) {
      this.cambiarIndex = 4;
      return;
    }
    this.cambiarIndex--;
  }

  elegirIndex(index: number) {
    this.cambiarIndex = index;
  }
}
