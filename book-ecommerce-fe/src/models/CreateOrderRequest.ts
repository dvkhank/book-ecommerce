export interface CreateOrderRequest {
  address: string;
  userId: number;
  shippingMethodId: number;
  paymentMethodId: number;
  orderDetails: {
    bookId: number;
    quantity: number;
    price: number;
  }[];
}
