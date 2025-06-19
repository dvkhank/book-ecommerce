import React, { useState } from "react";
import cookie from "react-cookies";
import { CreateOrderRequest } from "../models/CreateOrderRequest";
import api from "../api/api";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartMap = {
  [key: string]: CartItem;
};

const Cart = () => {
  const [cart, setCart] = useState<CartMap | null>(
    (cookie.load("cart") as CartMap) || null
  );

  const payload: CreateOrderRequest = {
    address: "123 Main Road",
    userId: 2,
    shippingMethodId: 1,
    paymentMethodId: 11,
    orderDetails: cart
      ? Object.values(cart).map((item) => ({
          bookId: item.id,
          quantity: item.quantity,
          price: item.price,
        }))
      : [],
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
  const handleIncrease = (id: number) => {
    const newCart = { ...cart };
    newCart[id].quantity += 1;
    setCart(newCart);
    cookie.save("cart", newCart);
  };
  const handleDecrease = (id: number) => {
    const newCart = { ...cart }; //copy cart for re-render update
    if (newCart[id].quantity > 1) {
      newCart[id].quantity -= 1;
    } else {
      delete newCart[id];
    }
    //Check if cart is null
    const isEmpty = Object.keys(newCart).length === 0;
    //if cart is null ( true), then set cart is null, else cart is newCart
    setCart(isEmpty ? null : newCart);
    cookie.save("cart", newCart);
  };
  const handleRemove = (id: number) => {
    const newCart = { ...cart };

    delete newCart[id];

    const isEmpty = Object.keys(newCart).length === 0;
    if (isEmpty) {
      cookie.remove("cart");
      setCart(null);
    } else {
      cookie.save("cart", newCart);
      setCart(newCart);
    }
    setCart(isEmpty ? null : newCart);
  };
  const total = cart
    ? Object.values(cart).reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    : 0;
  return (
    <div>
      <div className="container mt-5">
        {cart === null ? (
          <h3 className="text-info text-center">There is no books in cart</h3>
        ) : (
          <>
            <div className="container mt-5">
              <h2>🛒 Giỏ hàng</h2>
              <table className="table table-bordered table-striped mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody id="cart-body">
                  {Object.values(cart).map((c, index) => (
                    <tr key={c.id}>
                      <td>{index + 1}</td>
                      <td>{c.name}</td>
                      <td>{c.price}đ</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-outline-secondary me-2"
                            onClick={() => handleDecrease(c.id)}
                          >
                            -
                          </button>
                          <span>{c.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary ms-2"
                            onClick={() => handleIncrease(c.id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{c.price * c.quantity}đ</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemove(c.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-end fw-bold fs-5">
                Tổng tiền:{" "}
                <span className="text-danger">{total.toLocaleString()}đ</span>
              </p>
              <button
                onClick={handleVnPay}
                type="button"
                className="btn btn-danger mt-3"
              >
                Buy now
              </button>{" "}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
