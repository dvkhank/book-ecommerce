import React from "react";
import { User } from "../models/User";
import { Order } from "../models/Order";
import { NavLink, useNavigate } from "react-router-dom";

interface Props {
  user: User;
  orders: Order[];
}

const UserProfile: React.FC<Props> = ({ user, orders }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // hoặc "/" nếu bạn muốn về trang chủ
  };
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left side: User information */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">👤 User Information</h4>
              <hr />
              <p>
                <strong>Full Name:</strong> {user.firstName} {user.lastName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Username:</strong> {user.userName}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
              <p>
                <strong>Gender:</strong> {user.sex ? "Male" : "Female"}
              </p>
              <br />
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger w-100 mt-3"
              >
                🔓 Logout
              </button>
            </div>
          </div>
        </div>

        {/* Right side: Order list */}
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">📦 Recent Orders</h4>
              <hr />
              {orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Order Date</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>
                          {new Date(order.shippingDate).toLocaleDateString()}
                        </td>
                        <td>{order.totalPrice.toLocaleString()}₫</td>
                        <td>{order.paymentStatus ? "Paid" : "Unpaid"}</td>
                        <td>{order.address}</td>
                        <td>
                          <NavLink
                            to={`/orders/${order.id}`}
                            className="btn btn-sm btn-primary"
                          >
                            Details
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
