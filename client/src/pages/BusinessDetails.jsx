import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

<h1 id="bd2">BUSINESSES</h1>;

function BusinessDetails() {
  const { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/reviews/business/${businessId}`
      )
      .then((data) => {
        console.log(data);
        setBusiness(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="bd2">BUSINESSES</h1>
      <h2 id="businessdetailh2"> {business?.business}  </h2>

      {business?.reviews.map((review) => (
        <div key={review.id}>
          <Link
            style={{ display: "block", textAlign: "center", color: "lightskyblue" }}
            to={`/userDetail/${review.userid}`}
          >
            <br />
            Username: <h className="bd4">{review.username}</h>
            <br />
            <br />
          </Link>
          <Link
            style={{ display: "block", textAlign: "center", color: "white" }}
            to={`/userDetail/${review.businessid}`}
          ></Link>
          <div
            style={{
              display: "block",
              textAlign: "center",
              color: "lightskyblue",
            }}
            to={`/usersDetails/${review.businessrating}`}
          >
            Rating: <h className="bd4">{review.businessrating}</h>
            <br />
            <br />
            Comments: <h className="bd4">{review.reviewcomments}</h>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      ))}
    </div>
  );
}

export default BusinessDetails;
