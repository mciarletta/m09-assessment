import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

const INITIAL_USER = {
  userName: "",
  userPassword: "",
};

export default function LogInModal({ show, handleClose, doDelete, doAdd }) {
  const [user, setUser] = useState(INITIAL_USER);
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);

  function handleChange(evt) {
    setUser((previous) => {
      const next = { ...previous };
      next[evt.target.name] = evt.target.value;
      return next;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    setValidated(true);

    const res = await postLogin();

    console.log("after the postLogin");

    //delete
    if (doDelete) {
    }

    //add
    if (doAdd) {
    }
  }

  async function postLogin() {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(`http://localhost:8080/api/user/login`, config);
      console.log(response);

      if (response.status === 200) {
        console.log("You are in baby");
      } else if (response.status === 404) {
        console.log("Not verified");
      } else {
        return Promise.reject(
          new Error(`Unexpected status code ${response.status}`)
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      className="text-light bg-dark"
    >
      <Modal.Header closeButton>
        <Modal.Title>Verify Credentials</Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              name="userName"
              onChange={handleChange}
              value={user.userName}
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
              onChange={handleChange}
              value={user.userPassword}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" size="sm" variant="primary">
            Verify
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
