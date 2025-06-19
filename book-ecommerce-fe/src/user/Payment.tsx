import React, { useEffect } from "react";
import cookie from "react-cookies";
import { useLocation } from "react-router-dom";

const PaymentResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const status = queryParams.get("vnp_TransactionStatus");
  const orderId = queryParams.get("vnp_TxnRef");
  const amount = queryParams.get("vnp_Amount");
  const responseCode = queryParams.get("vnp_ResponseCode");
  useEffect(() => {
    if (status === "00") {
      cookie.remove("cart");
    }
  }, [status]);
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {status === "00" ? (
        <div>
          <h1 style={{ color: "green" }}>🎉 Payment Successful!</h1>
          <p>
            Order ID: <strong>{orderId}</strong>
          </p>
          <p>
            Amount: <strong>{Number(amount) / 100} VND</strong>
          </p>
          <p>
            Response Code: <strong>{responseCode}</strong>
          </p>
        </div>
      ) : (
        <div>
          <h1 style={{ color: "red" }}>❌ Payment Failed!</h1>
          <p>
            Order ID: <strong>{orderId}</strong>
          </p>
          <p>
            Response Code: <strong>{responseCode}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentResult;
