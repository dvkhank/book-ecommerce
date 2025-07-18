import React, { useEffect, useState } from "react";
import BookModel from "../models/BookModel";
import api from "../api/api";
import ImageModel from "../models/ImageModel";
import { Link } from "react-router-dom";
import renderRating from "../components/utils/Rating";
import cookie from "react-cookies";

interface BookProps {
  book: BookModel;
}
/* eslint-disable jsx-a11y/anchor-is-valid */
const BookPros: React.FC<BookProps> = ({ book }) => {
  const [listImages, setListImages] = useState<ImageModel[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const link = `/books/${book.id}/listImages`;
    api.get(link).then((res) => {
      setListImages(res.data._embedded.images);
      setLoading(false);
    });
  }, [book.id]);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const order = (id: number, name: String, discountedPrice: number) => {
    let cart = cookie.load("cart") || null;
    if (cart === null) {
      cart = {};
    }
    //Already in cart
    if (id in cart) {
      cart[id]["quantity"]++;
    } else {
      cart[id] = {
        id: id,
        name: name,
        price: discountedPrice,
        quantity: 1,
      };
    }
    cookie.save("cart", cart);
    alert("Add to cart successfully");
  };
  return (
    <div className="col-md-3 mt-2">
      <div className="card">
        <Link to={`/books/${book.id}`}>
          <img
            style={{
              height: "200px",
              width: "100%",
              objectFit: "contain",
              backgroundColor: "#f0f0f0",
            }}
            className="card-img-top"
            alt={book.name}
            src={listImages?.[0]?.link}
          />
        </Link>
        <div className="card-body">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/books/${book.id}`}
          >
            <h5 className="card-title">{book.name}</h5>
            <p className="card-text">{book.author}</p>
            <div className="row">
              <span className="original-price col-6">
                <del>{book.originalPrice} đ</del>
              </span>
              <span className="discounted-price col-6">
                <strong>{book.discountedPrice} đ</strong>
              </span>
            </div>
            <div>{renderRating(book.rating ? book.rating : 0)}</div>
          </Link>
          <div className="text-end">
            <button
              onClick={() =>
                order(book.id, book.name + "", book.discountedPrice || 0)
              }
              className="btn btn-secondary btn-block"
            >
              <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPros;
