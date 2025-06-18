import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { OrderDetailItem } from "../models/OrderDetailItem";

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<OrderDetailItem[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/user/order-info/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDetails(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <div className="container mt-4">
      <h3>📦 Order Details #{id}</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Book</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {details.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.book.name}</td>
              <td>{item.price.toLocaleString()}đ</td>
              <td>{item.quantity}</td>
              <td>{(item.price * item.quantity).toLocaleString()}đ</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;
