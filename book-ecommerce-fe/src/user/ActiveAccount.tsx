import React, { useEffect, useState } from "react";
import api from "../api/api";
import { NavLink } from "react-router-dom";

const ActiveAccount = () => {
  const [activated, setActivated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");
    const activeCode = searchParams.get("activeCode");

    console.log(email);
    console.log(activeCode);
    if (email && activeCode) {
      const handleActiveCode = async () => {
        api
          .get(`/user/active?email=${email}&activeCode=${activeCode}`)
          .then(() => setActivated(true))
          .catch((error) => setError(error));
      };
      handleActiveCode();
    }
  }, []);

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-center mb-4 text-primary">🔐 Account Activation</h2>

        {activated ? (
          <div className="alert alert-success text-center" role="alert">
            ✅ Your account has been <strong>activated successfully!</strong>
            <br />
            You can now <NavLink to={"/login"}>log in</NavLink>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center" role="alert">
            ❌ Activation failed:{" "}
            {typeof error === "string" ? error : "Something went wrong."}
          </div>
        ) : (
          <div className="text-center text-secondary">
            ⏳ Verifying your activation code...
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveAccount;
