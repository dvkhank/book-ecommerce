import React from "react";
import Book from "../../models/Book";
interface BookProps {
  book: Book;
}
/* eslint-disable jsx-a11y/anchor-is-valid */
const BookPros: React.FC<BookProps> = ({ book }) => {
  return (
    <div className="col-md-3 mt-2">
      <div className="card">
        <img
          style={{ height: "200px" }}
          className="card-img-top"
          alt={book.name}
          src={book.imageURL}
        />
        <div className="card-body">
          <h5 className="card-title">{book.name}</h5>
          <p className="card-text">{book.description}</p>
          <div className="price">
            <span className="original-price">
              <del>{book.originalPrice}</del>
            </span>
            <span className="discounted-price">
              <strong>{book.discountedPrice}</strong>
            </span>
          </div>
          <a href="#" className="btn btn-secondary btn-block">
            <i className="fas fa-shopping-cart"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookPros;
