export interface Book {
  id: number;
  name: string;
}

export interface OrderDetailItem {
  id: number;
  price: number;
  quantity: number;
  book: Book;
}
