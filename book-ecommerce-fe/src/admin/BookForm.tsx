import React, { FormEvent, useState } from "react";
import api from "../api/api";
import RequireAdmin from "./RequireAdmin";

const BookForm: React.FC = () => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    description: "",
    quantity: 0,
    originalPrice: 0,
    discountedPrice: 0,
    isbn: "",
    rating: 0,
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    api
      .post("/books", book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert("Add a book successfully");
        setBook({
          name: "",
          author: "",
          description: "",
          quantity: 0,
          originalPrice: 0,
          discountedPrice: 0,
          isbn: "",
          rating: 0,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Thêm sách mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên sách</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={book.name}
            onChange={(e) => setBook({ ...book, name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tác giả</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <input
            className="form-control"
            name="description"
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Số lượng</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={book.quantity}
            onChange={(e) =>
              setBook({ ...book, quantity: Number(e.target.value) })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Giá gốc</label>
          <input
            type="number"
            className="form-control"
            name="originalPrice"
            value={book.originalPrice}
            onChange={(e) =>
              setBook({ ...book, originalPrice: Number(e.target.value) })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Giá khuyến mãi</label>
          <input
            type="number"
            className="form-control"
            name="discountedPrice"
            value={book.discountedPrice}
            onChange={(e) =>
              setBook({ ...book, discountedPrice: Number(e.target.value) })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">ISBN</label>
          <input
            type="text"
            className="form-control"
            name="ISBN"
            value={book.isbn}
            onChange={(e) => setBook({ ...book, isbn: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Đánh giá (1-5)</label>
          <input
            type="number"
            className="form-control"
            name="rating"
            min="1"
            max="5"
            value={book.rating}
            onChange={(e) =>
              setBook({ ...book, rating: Number(e.target.value) })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Thêm sách
        </button>
      </form>
    </div>
  );
};
const BookForm_Admin = RequireAdmin(BookForm);
export default BookForm_Admin;
