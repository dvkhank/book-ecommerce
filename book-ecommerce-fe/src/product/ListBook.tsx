import React, { useEffect, useState } from "react";
import BookPros from "./components/BookProps";
import BookModel from "../models/BookModel";
import api from "../api/api";

const ListBook: React.FC = () => {
  const [listBooks, setListBooks] = useState<BookModel[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    api
      .get("/books")
      .then((res) => {
        //Because using RestResource _ebedded => books
        setListBooks(res.data._embedded.books);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mt-4">
        {listBooks.map((book) => (
          <BookPros key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default ListBook;
