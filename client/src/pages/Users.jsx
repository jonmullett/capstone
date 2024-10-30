import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <>
      <h1 className="bd2"> Users ({users.length}) </h1>
      <div class="userlinks">
        {users.map((user) => (
          <Link
            style={{ display: "block" }}
            to={`/userDetail/${user.id}`}
          >
            {user.username}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Users;
