import { computed, inject } from '@angular/core';
import { productsDataSource } from './common/productDatasource';
import {Product} from './models/products';
import {patchState, signalMethod, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import { Toaster } from './services/toaster';


export type EcommerceState = {
  products: Product[];
  category : string;
  wishlistItems: Product[];
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root'
  },

  withState<EcommerceState>({
    products: productsDataSource,
    category: 'all',
    wishlistItems: [],
  }),

  withComputed(({category, products, wishlistItems}) =>({
    filteredProducts: computed(() => {
      const cat = category();
      if (cat === 'all') return products();

      return products().filter(product =>
        product.category.toLowerCase() === cat.toLowerCase()
      );
    }),

    wishlistCount: computed(() => wishlistItems().length),
  })),

  withMethods((store, toaster = inject(Toaster)) => ({
    setCategory:signalMethod<string>((category:string) => {
      patchState(store, {category});
    }),

    addToWishlist:signalMethod<Product>((product:Product) => {
      const currentWishlist = store.wishlistItems();

      // Verifica se o produto já está na wishlist
      if (currentWishlist.find(p => p.id === product.id)) {
        toaster.info('Produto já está na sua lista de desejos');
        return;
      }

      // Adiciona o produto à wishlist
      const updatedWishlistItems = [...currentWishlist, product];
      patchState(store, {wishlistItems: updatedWishlistItems});
      toaster.success('Produto adicionado a minha lista de desejos');
    }),

    removeFromWishlist:signalMethod<string>((productId:string) => {
      const currentWishlist = store.wishlistItems();
      const updatedWishlistItems = currentWishlist.filter(p => p.id !== productId);
      patchState(store, {wishlistItems: updatedWishlistItems});
      toaster.info('Produto removido da minha lista de desejos');
    }),

    clearWishlist:signalMethod<void>(() => {
      patchState(store, {wishlistItems: []});
      toaster.info('Lista de desejos esvaziada');
    }),


  }))
);
