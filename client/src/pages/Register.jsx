import React, { useEffect } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";

export default function Register({ authAction, auth }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.id) {
      navigate("/");
    }
  }, [auth]);

  const handleRegister = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <p>
        {"REGISTER"}
        <AuthForm authAction={authAction} mode="register" />
      </p>
    </div>
  );
}

// export default Register;
