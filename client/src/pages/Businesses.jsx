import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Businesses = ({ businesses }) => {
  return (
    <>
      <h1 className="bd2">Businesses ({businesses.length})</h1>
      <div className="businesslinks">
        {businesses.map((business) => (
          <Link
            style={{ display: "block" }}
            to={`/businessDetail/${business.id}`}
          >
            {business.businessname}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Businesses;
