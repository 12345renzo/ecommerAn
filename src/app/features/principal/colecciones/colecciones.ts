import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatosCardGeneral } from '../../../data/dataCardMock';
import { CardGeneral } from '../../../types/cardGeneral';
import { CardComponent } from "../../../components/home/card-component/card-component";

@Component({
  selector: 'app-colecciones',
  imports: [CardComponent],
  templateUrl: './colecciones.html',
  styleUrl: './colecciones.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColeccionesComponent {
  cardPrincipal: CardGeneral[] = DatosCardGeneral;
}
