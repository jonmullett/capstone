import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/reviews/user/${userId}`)
      .then((data) => {
        console.log(data);
        setUser(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

    return (
      <div>
        <h1 className="bd2">Reviews from: {user?.user} </h1>
        <h2 id="businessdetailh2"> Business Reviews From: {user?.user}  </h2>
  
        {user?.reviews.map((review) => (
          <div key={review.id}>
            <Link
              style={{ display: "block", textAlign: "center", color: "lightskyblue" }}
              to={`/businessDetail/${review.businessid}`}
            >
              <br />
              Business: <h className="bd4">{review?.businessname}</h>
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
//     <div>
//       <h1>USER REVIEWS</h1>
//       <h3 id="userdetailh2">{user?.user}s Reviews </h3>

//       {user?.reviews.map((review) => (
//         <div key={review.id}>
//           <Link
//             style={{
//               display: "block",
//               textAlign: "center",
//               color: "white",
//               fontWeight: "700",
//             }}
            
//             to={`/businessDetail/${review.userid}`}
//           >
//             Business: {review.username}
//           </Link>

//           <Link
//             style={{ display: "block", textAlign: "center", color: "khaki" }}
//             to={`/businessDetails/${review.businessrating}`}
//           >
//             <br />
//             <br />
//             Rating: {review.businessrating}
//             <br />
//             <br />
//             Comments: {review.reviewcomments}
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

export default UserDetails;
