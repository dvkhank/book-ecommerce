import React, { useEffect, useState } from "react";
import BookPros from "./components/BookProps";
import BookModel from "../models/BookModel";
import api from "../api/api";
import Pagination from "../components/utils/Pagination";
interface ListBookInterface {
  searchKeyWord: string;
  selectedGenreId: number | null;
}
const ListBook: React.FC<ListBookInterface> = (props) => {
  const [listBooks, setListBooks] = useState<BookModel[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let url: string;
    const name = props.searchKeyWord.trim();
    const genreId = props.selectedGenreId;
    if (name && genreId !== null) {
      url = `/books/search/findByNameContainingAndGenreId?name=${name}&genreId=${genreId}&page=${
        current - 1
      }&size=8`;
    } else if (name !== "") {
      url = `/books/search/findByNameContaining?name=${name}&size=8`;
    } else if (genreId !== null) {
      url = `/books/search/findByGenreId?genreId=${
        props.selectedGenreId
      }&page=${current - 1}&size=8`;
    } else {
      url = `/books?size=8&page=${current - 1}`;
      console.log(url);
    }
    api
      .get(url)
      .then((res) => {
        //Because using RestResource _ebedded => books
        setListBooks(res.data._embedded.books);
        setTotal(res.data.page.totalPages);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [current, props.searchKeyWord, props.selectedGenreId]);

  const pagination = (current: number) => {
    setCurrent(current);
    console.log(current);
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
