import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddReview from "./AddReview";

const INITIAL_USER = {
  userName: "",
  userPassword: "",
};

export default function DeleteModal({ handleClose, deleteId }) {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //get the location so after we add or delete, we can refresh the page and get the updates
  const navigate = useNavigate();

  //get the title number from the params in the url, currently 1-6
  const { id } = useParams();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    setErrors([]);
    //delete
    if (deleteId) {
      console.log(deleteId);
      setLoading(true);
      const delRes = await deleteReview();
      setLoading(false);

      if (delRes) {
        setSuccess(true);
      }
    } else {
      setErrors(["Verification failed."]);
    }
  }

  const SUCCESS = (
    <>
      <Modal.Body>
        <Alert variant="success">
          Review id: {deleteId} successfully deleted.
        </Alert>
      </Modal.Body>
    </>
  );

  const DELETE = (
    <>
      <Modal.Body>
        <Alert variant="warning">
          You are about to delete this review. Continue?
        </Alert>
        <Button size="sm" variant="danger" onClick={handleSubmit}>
          Delete
        </Button>
      </Modal.Body>
    </>
  );

  function handleHome() {
    navigate("/");
  }

  async function deleteReview() {
    const jwtToken = localStorage.getItem("ffToken");

    try {
      //check if there is a token
      if (!jwtToken) {
        return Promise.reject("Unauthorized.");
      }

      const response = await fetch(
        `http://localhost:8080/api/review/delete/${deleteId}`,
        {
          method: "DELETE",
          Authorization: "Bearer " + jwtToken,
        }
      );

      //send the errors to display
      if (response.status === 204) {
        return true;
      } else if (response.status === 404) {
        const error = await response.json();
        console.log(error);
        return false;
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
    <>
      <Modal.Header closeButton>
        <Modal.Title>Verify Credentials</Modal.Title>
      </Modal.Header>
      {success ? SUCCESS : DELETE}

      <Modal.Footer>
        <Button size="sm" variant="success" onClick={handleHome}>
          Home
        </Button>
        <Button size="sm" variant="success" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>

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
