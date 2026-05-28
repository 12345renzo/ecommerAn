import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatosCardGeneral } from '../../../data/dataCardMock';
import { CardGeneral } from '../../../types/cardGeneral';
import { CardComponent } from "../../../components/home/card-component/card-component";
import { DatosCardCollection } from '../../../data/dataCardCollection';
import { CardCollections } from '../../../types/cardCollectionsTypes';
import { CardColeccionComponent } from "../../../components/card-coleccion/card-coleccion";

@Component({
  selector: 'app-colecciones',
  imports: [CardComponent, CardColeccionComponent],
  templateUrl: './colecciones.html',
  styleUrl: './colecciones.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColeccionesComponent {
  cardPrincipal: CardGeneral[] = DatosCardGeneral;
  cardCollections: CardCollections[] = DatosCardCollection;
}
