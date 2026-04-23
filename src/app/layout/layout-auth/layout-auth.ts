import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-auth',
  imports: [RouterOutlet],
  templateUrl: './layout-auth.html',
  styleUrl: './layout-auth.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAuth {}
