import { Row } from "react-bootstrap";

export default function Review({ review }) {

  return (
    <>
      <h1>Reviews:</h1>
      {review.map((rev => (
        <>
        <h6>Title: {rev.title} </h6>
        <p>{rev.reviewBody}</p>
        <p>Score: {rev.rating} </p>
        <p>Contributor: {rev.contributor} </p>
        <p>Posted: {rev.datePosted} </p>
        </>
      )))}
      
    </>
  );
}
