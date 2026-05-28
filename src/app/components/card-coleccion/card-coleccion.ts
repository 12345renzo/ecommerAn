import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardCollections } from '../../types/cardCollectionsTypes';
import { LucideArrowRight } from '@lucide/angular';

@Component({
  selector: 'app-card-coleccion',
  imports: [LucideArrowRight],
  templateUrl: './card-coleccion.html',
  styleUrl: './card-coleccion.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardColeccionComponent {
  coleccion = input<CardCollections>();
}
