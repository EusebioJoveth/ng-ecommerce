import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-empty-wishlist',
  imports: [MatIcon, MatButton, RouterLink],
  template: `
  <div class="flex flex-col items-center justify-center h-full text-center py-16">
     <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
     <mat-icon class="text-gray-400 transform scale-150">favorite_border</mat-icon>
     </div>

    <h2 class="text-2xl font-bold text-gray-900 mb-3">Sua lista de desejos está vazia</h2>
    <p class="text-gray-600 mb-8">Guarde os itens que você adora para mais tarde.</p>

    <button matButton="filled" class="min-w-[200px] py-3" routerLink="/products/all">Comece a comprar</button>
  </div>
  `,
  styles: ``
})
export class EmptyWishlist {

}
