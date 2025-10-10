import { Component } from '@angular/core';
import { MatButton, MatIconButton} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-actions',
  imports: [MatIconButton, MatIconModule, MatButton, RouterLink],
  template: `
    <div class="flex items-center gap-2">
      <button matIconButton routerLink="/my-wishlist">
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

}
