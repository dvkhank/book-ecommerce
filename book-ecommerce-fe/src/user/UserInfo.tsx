import React, { useEffect, useState } from "react";
import api from "../api/api";
import { User } from "../models/User";
import UserProfile from "./UserProfile";
import { Order } from "../models/Order";

const UserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Fetch error user:", err);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/order-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Fetch error user:", err);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);
  return user ? (
    <UserProfile user={user} orders={orders} />
  ) : (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default UserInfo;
