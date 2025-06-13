import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookModel from "../models/BookModel";
import api from "../api/api";
import BookImage from "./BookImage";

const BookDetails: React.FC = () => {
  const [book, setBook] = useState<BookModel | null>();
  const [loading, setLoading] = useState(true);
  const { bookId } = useParams();
  let bookIdNumber = 0;
  try {
    bookIdNumber = parseInt(bookId + "");
    if (Number.isNaN(bookIdNumber)) {
      bookIdNumber = 0;
    }
  } catch (error) {
    bookIdNumber = 0;
    console.error(error);
  }

  useEffect(() => {
    api
      .get(`/books/${bookIdNumber}`)
      .then((res) => setBook(res.data))
      .catch((error) => console.log(error));
    setLoading(false);
  }, [bookIdNumber]);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
  return (
    <>
      <div className="row mt-4 mb-4">
        <div className="col-4">
          <BookImage bookId={book?.id} />
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-6">
              <h1>{book?.name}</h1>
              <h3>{book?.author}</h3>
              <h4>
                {book?.rating} <i className="fa-solid fa-star"></i>
              </h4>
              <h4>
                <del>{book?.originalPrice}</del>{" "}
              </h4>
              <h4>{book?.discountedPrice}</h4>
              <hr />
              <div
                dangerouslySetInnerHTML={{ __html: book?.description + "" }}
              ></div>
              <hr />
            </div>
            <div className="col-6">Cart</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">REVIEW</div>
      </div>
    </>
  );
};

export default BookDetails;
