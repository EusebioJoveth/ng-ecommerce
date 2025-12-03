import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from '../../directives/view-panel';
import { EcommerceStore } from '../../ecommerce-store';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel, CurrencyPipe],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-4">Resumo do pedido</h2>
      <div class="space-y-3 text-lg pt-4 border-t">
        <div class="flex justify-between">
          <span>Subtotal:</span>
          <span>{{subtotal() | currency:' AO'}}</span>
        </div>
        <div class="flex justify-between">
          <span>Imposto:</span>
          <span>{{tax() | currency:' AO'}}</span>
        </div>
        <div class="flex justify-between border-t pt-3 font-bold text-lg">
          <span>Total:</span>
          <span>{{total() | currency:' AO'}}</span>
        </div>
      </div>

    </div>
  `,
  styles: ``
})
export class SummarizeOrder {
  store = inject(EcommerceStore);

  subtotal = computed(() => {
    return Math.round(this.store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0));
  });

  tax = computed(() => {
    return Math.round(this.subtotal() * 0.05);
  });

  total = computed(() => {
    return Math.round(this.subtotal() + this.tax());
  });

}
