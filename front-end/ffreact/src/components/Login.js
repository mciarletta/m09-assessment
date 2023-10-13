import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function Login() {
  const navigate = {useNavigate};
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    event.preventDefault;

  }


  return (
    <Form onSubmit={handleSubmit}>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            name="userName"
            onChange={(event) => setUser(event.target.value)}
            value={user}
            type="text"
            placeholder="Username"
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            name="userPassword"
            onChange={(event) => setPassword(event.target.value)}
            value={user}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
      </Modal.Body>
      {
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={navigate("/")}>
            Exit
          </Button>
          <Button type="submit" size="sm" variant="primary">
            Log In
          </Button>
        </Modal.Footer>
      }
    </Form>
  );
    }



export default Login;