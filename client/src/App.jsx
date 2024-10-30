import axios from "axios";
import { useState, useEffect } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Businesses from "./pages/Businesses";
import CreateReview from "./pages/CreateReview";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDetails from "./pages/UserDetails";
import BusinessDetails from "./pages/BusinessDetails";
// import NavDropdown from "./pages/NavDropdown.jsx";

function App() {
  const [auth, setAuth] = useState({});
  const [login, setLogin] = useState([]);
  const [register, setRegister] = useState([]);
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [createReview, setCreateReview] = useState([]);
  // const [navDropdown, setNavDropdown] = useState([]);

  useEffect(() => {
    attemptLoginWithToken();
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/businesses`)
      .then((data) => {
        console.log(data);
        setBusinesses(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/users`)
      .then((data) => {
        console.log(data);
        setUsers(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const attemptLoginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    console.log(token);
    if (token) {
      const response = await fetch(`http://localhost:3000/api/auth/me`, {
        headers: {
          authorization: token,
        },
      });

      const json = await response.json();

      if (response.ok) {
        setAuth(json);
      } else {
        window.localStorage.removeItem("token");
      }
    }
  };

  const authAction = async (credentials, mode) => {
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (response.ok) {
      window.localStorage.setItem("token", json.token);
      attemptLoginWithToken();
    } else {
      throw json;
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <>
      <h1 id="header">Acme Business Reviews</h1>
      <nav>
        <a href="menuhome">
          <Link to="/">Home</Link>
        </a>
        <NavLink
          className={({ isActive }) => (isActive ? "style activenav" : "style")}
          to="/businesses"
        >
          Businesses ({businesses.length})
        </NavLink>

        <NavLink 
        className={({ isActive }) => (isActive ? "style activenav" : "style")}
        to="/users">
          
          Users ({users.length})
          </NavLink>

        {auth.id ? (
          <Link to="/createReview">Create Review</Link>
        ) : (
          <Link to="/login">Login </Link>
        )}
      </nav>
      {auth.id && <button onClick={logout}>Logout {auth.username}</button>}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              authAction={authAction}
              auth={auth}
              businesses={businesses}
              users={users}
              createReview={createReview}
              login={login}
              register={register}
            />
          }
        />
        <Route
          path="/businesses"
          element={
            <Businesses setBusinesses={setBusinesses} businesses={businesses} />
          }
        />

        {!!auth.id && (
          <Route
            path="/createReview"
            element={<CreateReview userId={auth.id} />}
          />
        )}

        <Route
          path="/users"
          element={<Users setUsers={setUsers} users={users} />}
        />

        <Route
          path="/login"
          element={<Login login={login} authAction={authAction} auth={auth} />}
        />

        <Route
          path="/createReview"
          element={<CreateReview CreateReview={CreateReview} />}
        />

        <Route
          path="/userDetail/:userId"
          element={<UserDetails UserDetails={UserDetails} />}
        />

        <Route
          path="/businessDetail/:businessId"
          element={<BusinessDetails BusinessDetails={BusinessDetails} />}
        />

        <Route
          path="/register"
          element={
            <Register register={register} authAction={authAction} auth={auth} />
          }
        />

        <Route
          path="*"
          element={
            <Home
              authAction={authAction}
              auth={auth}
              businesses={businesses}
              users={users}
              createReview={createReview}
              login={login}
              register={register}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
