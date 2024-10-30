import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// const CreateReview = ({ businesses }) => {
//   return <h1>Placeholder for Create Review</h1>;
// };

function CreateReview({ userId }) {
  const [formData, setFormData] = useState({ userId });
  const [businesses, setBusinesses] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/businesses")
      .then((data) => {
        console.log(data);

        setBusinesses(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    if (!formData.businessId || !formData.businessrating) {
      alert("must select a business and choose rating");
      return;
    }
    axios
      .post("http://localhost:3000/api/reviews", formData)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1 className="bd2">LEAVE A BUSINESS REVIEW</h1>
      <form onSubmit={handleSubmit}>
        <label id="formtext">
          Leave a Review for: <></>
          <select
            name="businessId"
            value={formData.businessname}
            onChange={handleChange}
          >
            <label id="SelectBusiness"></label>
            <option value="businessname">SELECT</option>
            {businesses.map((business) => (
              <option value={business.id}>{business.businessname}</option>
            ))}
          </select>
        </label>

        <label id="rating">
          Rating (1-5): <></>
          <select
            name="businessrating"
            value={formData.rating}
            onChange={handleChange}
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>

        <label id="comments">
          Comments: <></>
          <textarea
            name="reviewcomments"
            value={formData.review}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateReview;

// import React from "react";

// function ReviewList({ reviews }) {
//   return (

//       {reviews.map((review) => (
//         <Reviews key={review.id} review={review} />
//       ))}

//   );
// }

// export default ReviewList;

// <h1>Create Review ({createReviewForm.length})</h1>
// <div>
//   {createReview.map((createReview) => (
//     <Link
//       style={{ display: "block" }}
//       to={`/createReviewForm/${createReview.id}`}
//     >
//       {createReview.createReviewForm}
//     </Link>
//   ))}
// </div>
