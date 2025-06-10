import React, { useEffect, useState } from "react";
import BookPros from "./components/BookProps";
import BookModel from "../models/BookModel";
import api from "../api/api";
import Pagination from "../components/utils/Pagination";

const ListBook: React.FC = () => {
  const [listBooks, setListBooks] = useState<BookModel[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    api
      .get(`/books?size=8&page=${current - 1}`)
      .then((res) => {
        //Because using RestResource _ebedded => books
        setListBooks(res.data._embedded.books);
        setTotal(res.data.page.totalPages);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [current]);

  const pagination = (current: number) => {
    setCurrent(current);
  };

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
      <Pagination current={current} total={total} pagination={pagination} />
    </div>
  );
};

export default ListBook;
