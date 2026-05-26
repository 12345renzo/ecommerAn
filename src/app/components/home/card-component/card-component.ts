import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardGeneral } from '../../../types/cardGeneral';
import { LucideDynamicIcon } from "@lucide/angular";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-component',
  imports: [LucideDynamicIcon, NgClass],
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  datos = input<CardGeneral>();
}
