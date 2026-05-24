import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Filtros } from "../../components/filtros/filtros";

@Component({
  selector: 'app-catalogo',
  imports: [Filtros],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogoComponent {

}