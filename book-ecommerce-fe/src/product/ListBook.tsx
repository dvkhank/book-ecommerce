import React from "react";
import BookPros from "./components/BookProps";
import Book from "../models/Book";

const ListBook: React.FC = () => {
  const books: Book[] = [
    {
      id: 1,
      name: "Book 1",
      author: "Nobita",
      description: "Description for book",
      quantity: 12,
      originalPrice: 50000,
      discountedPrice: 45000,
      imageURL: "images/banner/anh3.jpeg",
    },
    {
      id: 1,
      name: "Book 1",
      author: "Nobita",
      description: "Description for book",
      quantity: 12,
      originalPrice: 50000,
      discountedPrice: 45000,
      imageURL: "images/banner/anh3.jpeg",
    },
  ];
  return (
    <div className="container">
      <div className="row mt-4">
        {books.map((book) => (
          <BookPros book={book} />
        ))}
      </div>
    </div>
  );
};

export default ListBook;
