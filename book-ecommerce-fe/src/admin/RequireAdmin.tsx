import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  isAdmin: boolean;
}

const RequireAdmin = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAdminCheck: React.FC<P> = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      } else {
        const decodedToken = jwtDecode(token) as JwtPayload;
        const isAdmin = decodedToken.isAdmin;

        if (!isAdmin) {
          navigate("/error");
          return;
        }
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAdminCheck;
};

export default RequireAdmin;
