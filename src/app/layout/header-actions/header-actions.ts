import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-header-actions',
  imports: [MatIconButton, MatIconModule, MatButton, RouterLink, MatBadgeModule],
  template: `
    <div class="flex items-center gap-2">
      <button matIconButton routerLink="/my-wishlist" [matBadge]="store.wishlistCount().toString()" [matBadgeHidden]="store.wishlistCount() === 0">
        <mat-icon>favorite</mat-icon>
      </button>

      <button matIconButton>
        <mat-icon>shopping_cart</mat-icon>
      </button>

      <button matButton>
        Entrar
      </button>

      <button matButton="filled">
        Increver-se
      </button>
    </div>
  `,
  styles: ``
})
export class HeaderActions {

  store = inject(EcommerceStore);

}
