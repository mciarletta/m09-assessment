import { Row, Col } from "react-bootstrap";

export default function Review({ review }) {
  return (
    <div className="border border-5 my-2">
      <h1 className="d-flex justify-content-center">Reviews</h1>
      <Row sm={1}>
        {review.map((rev) => (
          <Col className="my-2" key={rev.id}>
            <div className="border-top border-bottom border-3">
            <h6>Title: {rev.title} </h6>
            <p>{rev.reviewBody}</p>
            <h6>Score: {rev.rating} </h6>
            <h6>Contributor: {rev.contributor} </h6>
            <h6>Posted: {rev.datePosted} </h6>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
