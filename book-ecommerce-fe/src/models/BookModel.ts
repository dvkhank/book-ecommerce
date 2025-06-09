class BookModel {
  id: number;
  name?: string;
  author?: string;
  description?: string;
  quantity?: number;
  originalPrice?: number;
  discountedPrice?: number;
  rating?: number;
  ISBN?: string;

  constructor(
    id: number,
    name: string,
    author: string,
    description: string,
    quantity: number,
    original_price: number,
    discounted_price: number,
    rating: number,
    ISBN: string
  ) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.description = description;
    this.quantity = quantity;
    this.originalPrice = original_price;
    this.discountedPrice = discounted_price;
    this.rating = rating;
    this.ISBN = ISBN;
  }
}
export default BookModel;
