import { Row, Col, Button } from "react-bootstrap";
import LogInModal from "./LogInModal";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import AddReview from "./AddReview";
import { useParams } from "react-router-dom";

export default function Review({ review }) {
  const [show, setShow] = useState(false);
  const [delId, setDelId] = useState(null);
  const [contributor, setContributor] = useState(null);

    const { id } = useParams();



  //grab our auth contenxt
  const auth = useContext(AuthContext);

  function handleInfo() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  return (
    <>
      {show ? (
        <AddReview handleClose={handleClose} id={id} contributor={contributor} show={show} />
      ) : null}

      <div className="border border-5 my-2 border-secondary p-2">
        <Row className="d-flex justify-content-end align-items-center">
          <Col xs={4} className="d-flex justify-content-center">
            <h1>Reviews</h1>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
          {auth.user && (
                      <Button
                      onClick={() => {
                        handleInfo();
                        setContributor(auth.user.username)
                      }}
                        variant="primary"
                        size="sm"
                        style={{ height: "2rem" }}
                      >
                        Add Review
                      </Button>
                    )}
          </Col>
        </Row>

        <Row xs={1} lg={2}>
          {review.map((rev) => (
            <Col className="my-2" key={rev.id}>
              <div className="border-top border-bottom border-3 border-secondary">
                <h6>Title: {rev.title} </h6>
                <p>{rev.reviewBody}</p>
                <h6>Score: {rev.rating} </h6>
                <h6>Contributor: {rev.contributor} </h6>

                <Row className="d-flex justify-content-start">
                  <Col xs={6} className="d-flex">
                    <h6>Posted: {rev.datePosted}</h6>
                  </Col>
                  <Col xs={6} className="d-flex justify-content-end pb-2">
                    {auth.user && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={{ height: "2rem" }}
                        onClick={() => {
                          setDelId(rev.id);
                          handleInfo();
                        }}
                      >
                        Delete Review
                      </Button>
                    )}
                    
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
