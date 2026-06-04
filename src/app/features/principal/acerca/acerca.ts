import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardTeamType } from '../../../types/cardTeamType';
import { dataCardTeamMock } from '../../../data/dataCardTeamMock';
import { CardTeamComponent } from "../../../components/card-team/card-team";

@Component({
  selector: 'app-acerca',
  imports: [CardTeamComponent],
  templateUrl: './acerca.html',
  styleUrl: './acerca.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcercaComponent {
  datosEquipos: CardTeamType[] = dataCardTeamMock;
}
