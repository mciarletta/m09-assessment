import { Container, Form } from "react-bootstrap";
import { useState } from "react";

export default function AddReview() {
    const [review, setREview] = useState(INITIAL_REVIEW);

const INITIAL_REVIEW = {
    title: "",
};

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title: </Form.Label>
          <Form.Control
            required
            name="title"
            onChange={handleChange}
            value={review.title}
            type="text"
            placeholder="Username"
            autoFocus
          />
        </Form.Group>
      </Form>
    </Container>
  );
}
