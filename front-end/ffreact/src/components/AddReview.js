import { Modal, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AddReview({ id, contributor }) {
  // Get the current date
  const currentDate = new Date();

  // Extract year, month, and day
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Create the formatted date string in YYYY-mm-dd format
  const formattedDate = `${year}-${month}-${day}`;

  const INITIAL_REVIEW = {
    game_id: id,
    title: "",
    rating: "",
    reviewBody: "",
    datePosted: formattedDate,
    contributor: contributor,
  };
  //set the review info
  const [review, setReview] = useState(INITIAL_REVIEW);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);


  function handleChange(evt) {
    setReview((previous) => {
      const next = { ...previous };
      next[evt.target.name] = evt.target.value;
      return next;
    });
  }

  async function handleSubmit(event){
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    setErrors([]);

    //check before submitting
    if (review.rating && review.reviewBody && review.title){
        setLoading(true);
        const res = await doAdd();
        setLoading(false);

        //if res exists, then it went through
        if (res){
            setSuccess(true);
        } else {
            setErrors(["Failed."]);

        }
    }
  }

  function handleHome() {
    navigate("/");
  }

  async function doAdd() {
    const jwtToken = localStorage.getItem("ffToken");
      if (!jwtToken) {
        return Promise.reject("Unauthorized.");
      }
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,

      },
      body: JSON.stringify(review),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/review/create`,
        config
      );

      if (response.ok) {
        const data = response.json();

        return data;
      } else if (response.status === 404) {
        setLoading(false);
        return false;
      } else {
        setLoading(false);
          return false;
        
      }
    } catch (e) {
      console.log(e);
      setErrors([e]);
      setLoading(false);
      return false;
    }
  }

  const SUCCESS = (
    <>
      <Modal.Body>
        <Alert variant="success">
          Review added successfully.
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="success" onClick={handleHome}>
          Home
        </Button>
      </Modal.Footer>
    </>
  );

  return (
    <>
              {success ? SUCCESS : (<Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="control.gameid">
          <Form.Label>Final Fantasy Title Number: </Form.Label>
          <Form.Control
            required
            name="gameId"
            onChange={handleChange}
            value={review.game_id}
            type="number"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="control.title">
          <Form.Label>Title: </Form.Label>
          <Form.Control
            required
            name="title"
            onChange={handleChange}
            value={review.title}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="control.rating">
          <Form.Label>Rating: </Form.Label>
          <Form.Control
            required
            name="rating"
            onChange={handleChange}
            value={review.rating}
            type="number"
            min={0}
            max={10}
            step={0.1}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="control.reviewbody">
          <Form.Label>Review: </Form.Label>
          <Form.Control
            as="textarea"
            required
            name="reviewBody"
            onChange={handleChange}
            value={review.reviewBody}
            rows={10}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="control.contributor">
          <Form.Label>Contributor: </Form.Label>
          <Form.Control
            required
            name="contributor"
            onChange={handleChange}
            value={review.contributor}
            type="text"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="control.datePosted">
          <Form.Label>Date: </Form.Label>
          <Form.Control
            required
            name="datePosted"
            onChange={handleChange}
            value={review.datePosted}
            type="date"
            disabled
          />
        </Form.Group>
        {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (<Modal.Footer>
        <Button size="sm" variant="secondary" onClick={handleHome}>
          Home
        </Button>
        <Button type="submit" size="sm" variant="primary">
          Submit 
        </Button>
      </Modal.Footer>)}
      
        </Form>)}

      
        {errors.length
            ? errors.map((e) => (
                <Alert variant="danger" key={e}>
                  {e}
                </Alert>
              ))
            : null}
    </>
  );
}
