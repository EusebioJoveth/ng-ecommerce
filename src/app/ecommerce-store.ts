import { computed, inject } from '@angular/core';
import { productsDataSource } from './common/productDatasource';
import {Product} from './models/products';
import {patchState, signalMethod, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import { Toaster } from './services/toaster';
import { CartItem } from './models/cart/cart';
import { produce } from 'immer';


export type EcommerceState = {
  products: Product[];
  category : string;
  wishlistItems: Product[];
  cartItems: CartItem[];
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root'
  },

  withState<EcommerceState>({
    products: productsDataSource,
    category: 'all',
    wishlistItems: [],
    cartItems: [],
  }),

  withComputed(({category, products, wishlistItems, cartItems}) =>({
    filteredProducts: computed(() => {
      const cat = category();
      if (cat === 'all') return products();

      return products().filter(product =>
        product.category.toLowerCase() === cat.toLowerCase()
      );
    }),

    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
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

    addToCart:(product: Product, quantity = 1) => {
      const existingItemIndex = store.cartItems().findIndex(item => item.product.id === product.id);

      const updatedCartItems =  produce(store.cartItems(), (draft) => {
        if(existingItemIndex !== -1){
          draft[existingItemIndex].quantity += quantity;
        } else {
          draft.push({product, quantity});
        }
      });

      patchState(store, {cartItems: updatedCartItems});
      toaster.success(existingItemIndex !==-1 ? 'Quantidade atualizada' : 'Produto adicionado ao carrinho');

    },

    setItemQuantity(params: {productId: string, quantity: number})  {
      const index = store.cartItems().findIndex(item => item.product.id === params.productId);
      if(index !== -1){
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });
        patchState(store, {cartItems: updatedCartItems});
      }
    },

    addAllWishlistToCart: () =>{
      const updateCartItems = produce(store.cartItems(), (draft) => {
        store.wishlistItems().forEach(item => {
          if(!draft.find(i => i.product.id === item.id)){
            draft.push({product: item, quantity: 1});
          }
        })
      })

      patchState(store, {cartItems: updateCartItems, wishlistItems: []});
      toaster.success('Todos os itens da lista de desejos foram adicionados ao carrinho');
      },

    moveToWishlist: (product: Product) =>{
      const updatedCartItems = store.cartItems().filter(item => item.product.id !== product.id);
      const updatewishlistItems = produce(store.wishlistItems(), (draft) => {
        if(!draft.find(i => i.id === product.id)){
          draft.push(product);
        }
      });
      patchState(store, {cartItems: updatedCartItems, wishlistItems: updatewishlistItems});
      toaster.success('Produto movido para a lista de desejos');
    },

    removeFromCart: (product: Product) =>{
      const updatedCartItems = store.cartItems().filter(item => item.product.id !== product.id);
      patchState(store, {cartItems: updatedCartItems});
      toaster.success('Produto removido do carrinho');
    }

  }))
);
