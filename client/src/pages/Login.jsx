import React, { useEffect } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login({ authAction, auth }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.id) {
      navigate("/");
    }
  }, [auth]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div id="logintext">
        <p>
          {"LOGIN"}
          <AuthForm authAction={authAction} mode="login" />
        </p>
      </div>
      <div id="logtext">
        <p>
          {"Don't have an account, "}
          <a href="register">
            <Link to="/register"> REGISTER</Link>
          </a>
        </p>
      </div>
    </div>
  );
}
