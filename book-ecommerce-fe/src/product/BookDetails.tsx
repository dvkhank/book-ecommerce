import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookModel from "../models/BookModel";
import api from "../api/api";
import BookImage from "./BookImage";
import CommentBook from "./CommentBook";
import renderRating from "../components/utils/Rating";
import formatMoney from "../components/utils/FormatMoney";
import cookie from "react-cookies";
import { CreateOrderRequest } from "../models/CreateOrderRequest";

const BookDetails: React.FC = () => {
  const [book, setBook] = useState<BookModel | null>();
  const [loading, setLoading] = useState(true);
  const { bookId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  console.log(user);
  const payload: CreateOrderRequest = {
    address: "123 Main Road",
    userId: user.id,
    shippingMethodId: 1,
    paymentMethodId: 11,
    orderDetails: [
      {
        bookId: book?.id || 0,
        quantity: quantity,
        price: book?.discountedPrice || 0,
      },
    ],
  };
  const handleVnPay = async () => {
    try {
      const res = await api.post("/payment", payload);
      const redirectUrl = res.data;
      console.log(res.data);
      window.location.href = redirectUrl;
    } catch (err) {
      console.error("Lỗi khi tạo thanh toán:", err);
      alert("Không thể tạo thanh toán");
    }
  };

  const increaseQuantity = () => {
    const currentQuantity = book && book.quantity ? book.quantity : 0;
    setQuantity((prev) => (prev < currentQuantity ? prev + 1 : prev));
  };
  const decreaseQuantiy = () => {
    if (quantity > 1) {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };
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

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    const currentQuantity = book && book.quantity ? book.quantity : 0;
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      newQuantity <= currentQuantity
    ) {
      setQuantity(newQuantity);
    }
  };
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
  const order = (id: number, name: String, discountedPrice: number) => {
    let cart = cookie.load("cart") || null;
    if (cart === null) {
      cart = {};
    }
    //Already in cart
    if (id in cart) {
      cart[id]["quantity"] += quantity;
    } else {
      cart[id] = {
        id: id,
        name: name,
        price: discountedPrice,
        quantity: quantity,
      };
    }
    cookie.save("cart", cart);
    alert("Add to cart successfully");
  };
  return (
    <>
      <div className="row mt-4 mb-4">
        <div className="col-4">
          <BookImage bookId={bookIdNumber} />
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-6">
              <h1>{book?.name}</h1>
              <h3>{book?.author}</h3>
              <h4>{renderRating(book?.rating ?? 0)}</h4>
              <h4>
                <del>{formatMoney(book?.originalPrice)} đ</del>
              </h4>
              <h4 className="text-danger">
                {formatMoney(book?.discountedPrice)} đ
              </h4>
              <hr />
              <div
                dangerouslySetInnerHTML={{ __html: book?.description + "" }}
              ></div>
              <hr />
            </div>
            <div className="col-6">
              <div className="mb-2">Quantity</div>
              <div className="d-flex align-items-center">
                <button
                  onClick={decreaseQuantiy}
                  className="btn btn-outline-secondary me-2"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  className="form-control text-center"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button
                  onClick={increaseQuantity}
                  className="btn btn-outline-secondary ms-2"
                >
                  +
                </button>
              </div>
              {book?.quantity && (
                <div className="mt-2 text-center">
                  Subtotal <br />
                  <h4>
                    {formatMoney(quantity * (book.discountedPrice || 0))} đ
                  </h4>
                </div>
              )}
              <div className="d-grid gap-2">
                {" "}
                <button
                  onClick={handleVnPay}
                  type="button"
                  className="btn btn-danger mt-3"
                >
                  Buy now
                </button>
                <button
                  onClick={() =>
                    order(
                      book?.id || 0,
                      book?.name + "",
                      book?.discountedPrice || 0
                    )
                  }
                  type="button"
                  className="btn btn-outline-info mt-2"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <CommentBook bookId={bookIdNumber} />
        </div>
      </div>
    </>
  );
};

export default BookDetails;
