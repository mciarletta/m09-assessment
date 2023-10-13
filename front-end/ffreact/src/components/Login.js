import {  Button, Form, Alert } from "react-bootstrap";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authapi";
import AuthContext from "../context/AuthContext";

function Login() {
  //navigate stuff
  const navigate = useNavigate();

  //our states
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  //our contenxt for authentication
  const auth = useContext(AuthContext);


  //submit button function
  const handleSubmit = async (event) => {
    event.preventDefault();

    //clear the errors
    setErrors([]);

    //go through the login
    login({username: user, password: password})
    .then(data => {
      auth.handleLoggedIn(data);
      navigate("/");
    })
    .catch(err => {
      setErrors(['Invalid username/password.']);
    });

  };

  return (
    <>
    {errors.map((error, i) => (
        <Alert varient="danger" key={i}>{error}</Alert>
      ))}
      <Form onSubmit={handleSubmit}>
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
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Link className="btn btn-secondary" to="/">
          Cancel
        </Link>
        <Button type="submit" size="sm" variant="primary">
          Log In
        </Button>
      </Form>
    </>
  );
}

export default Login;
