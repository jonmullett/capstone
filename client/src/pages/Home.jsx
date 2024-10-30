import React from "react";
// import ImagesComponent from "./components/header/images/image1.jpeg"
import AuthForm from "../components/AuthForm/AuthForm";


const Home = ({ auth, authAction, logout, businesses, users, reviews }) => {
  return (
    <div>
      <img src="./images/image1.jpeg" alt="logo" />
      <h1 className="bd2">Welcome to Acme Business Reviews</h1>
      <p>
        <b>Our Businesses</b>
        <br />
        <div class="text1">Businesses ({businesses.length}) </div> <br />
        <br />
        <b>Number of Users </b>
        <br />
        <div class="text1">Users ({users.length})</div>
        <br />
      </p>
    </div>
  );
};

<div class="footer">
  <p>Footer</p>
</div>;

export default Home;

