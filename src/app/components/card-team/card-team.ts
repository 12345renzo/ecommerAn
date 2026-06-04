import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardTeamType } from '../../types/cardTeamType';

@Component({
  selector: 'app-card-team',
  imports: [],
  templateUrl: './card-team.html',
  styleUrl: './card-team.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTeamComponent {
  datosCardTeam = input<CardTeamType>(); 
}
