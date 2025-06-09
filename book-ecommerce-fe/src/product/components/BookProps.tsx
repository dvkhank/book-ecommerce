import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import api from "../../api/api";
import ImageModel from "../../models/ImageModel";
interface BookProps {
  book: BookModel;
}
/* eslint-disable jsx-a11y/anchor-is-valid */
const BookPros: React.FC<BookProps> = ({ book }) => {
  const [listImages, setListImages] = useState<ImageModel[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const link = `/books/${book.id}/listImages`;
    console.log(link);
    api.get(link).then((res) => {
      setListImages(res.data._embedded.images);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
  return (
    <div className="col-md-3 mt-2">
      <div className="card">
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
