import { Component, effect, inject, input, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { categoriesDataSource } from '../../common/categoriesDataSource';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import {EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenavContainer, MatSidenavContent, MatSidenav, MatNavList, MatListItem,
    RouterLink, TitleCasePipe, ToggleWishlistButton
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Categorias</h2>

          <mat-nav-list>
            @for (cat of categories(); track cat) {
              <mat-list-item [activated]="category() === cat" class="my-2" [routerLink]="['/products', cat]">
                <span matListItemTitle class="font-medium" [class]="cat === category() ? 'text-white' : 'null'">{{cat | titlecase}}</span>
              </mat-list-item>
            }

          </mat-nav-list>
        </div>
      </mat-sidenav>


     <mat-sidenav-content class="bg-gray-100 p-6 h-full">
      <h1 class="text-2xl font-bold text-gray-900 mb-1">{{category() | titlecase}}</h1>
      <p class="text-base text-gray-600 mb-6">{{store.filteredProducts().length}} produtos encontrados</p>

      <div class="responsive-grid">
        @for (product of store.filteredProducts(); track product.id) {
          <app-product-card [product]="product">
            <app-toggle-wishlist-button class="!absolute z-10 top-3 right-3" [product]="product"/>
          </app-product-card>
        }
      </div>
     </mat-sidenav-content>
    </mat-sidenav-container>


  `,
  styles: `
    .responsive-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    @media (max-width: 768px) {
      .responsive-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
      }
    }

    @media (max-width: 480px) {
      .responsive-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }
  `
})
export default class ProductsGrid {
  protected category = input<string>('all');

 store = inject(EcommerceStore);

  categories = signal<string[]>(categoriesDataSource);

  constructor() {
    // Inicializa com a categoria da rota
    this.store.setCategory(this.category());

    // Sincroniza quando a categoria muda via rota
    effect(() => {
      this.store.setCategory(this.category());
    });
  }

}
