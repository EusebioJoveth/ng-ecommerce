import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../models/products';
import { productsDataSource } from '../../common/productDatasource';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { categoriesDataSource } from '../../common/categoriesDataSource';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenavContainer, MatSidenavContent, MatSidenav, MatNavList, MatListItem,
    RouterLink, TitleCasePipe
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
      <p class="text-base text-gray-600 mb-6">{{filteredProducts().length}} produtos encontrados</p>
      <div class="responsive-grid">
        @for (product of filteredProducts(); track product.id) {
          <app-product-card [product]="product"/>
        }
      </div>
     </mat-sidenav-content>
    </mat-sidenav-container>


  `,
  styles: ``
})
export default class ProductsGrid {
  protected readonly category = input<string>('all');

  protected readonly products = signal<Product[]>(productsDataSource);

  filteredProducts = computed(() => {
    const categoryFilter = this.category();
    if (categoryFilter === 'all') {
      return this.products();
    }
    return this.products().filter(product =>
      product.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  });

  categories = signal<string[]>(categoriesDataSource);
}
