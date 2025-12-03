import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'products/all', pathMatch: 'full'},

  {
    path: 'products/:category',
    loadComponent: () => import('./pages/products-grid/products-grid'),
  },
  {
    path: 'my-wishlist',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist'),
  },

  {
    path: 'cart',
    loadComponent: () => import('./pages/view-cart/view-cart'),
  }


];
