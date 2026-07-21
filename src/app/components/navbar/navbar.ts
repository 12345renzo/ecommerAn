import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LucideSearch, LucideShoppingCart, LucideUser } from '@lucide/angular';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LucideUser, LucideShoppingCart, LucideSearch, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  busquedad = signal<string | null>(this.route.snapshot.queryParamMap.get('q'));

  constructor(){
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.busquedad.set(params.get('q'));
    })
  }

  miFuncion() {
    if(this.busquedad()){
      this.router.navigate([],{
        queryParams:{
          q: this.busquedad(),
          page: 1,
        },
        queryParamsHandling: 'merge'
      });
    }
    else{
      this.router.navigate([], {
        queryParams: {
          q: null,
        },
        queryParamsHandling: 'merge',
      });
    }
  }  

}
