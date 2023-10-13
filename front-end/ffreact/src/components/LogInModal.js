import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddReview from "./AddReview";

const INITIAL_USER = {
  userName: "",
  userPassword: "",
};

export default function LogInModal({ show, handleClose, deleteId }) {
  const [user, setUser] = useState(INITIAL_USER);
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [add, setAdd] = useState(false);
  const [contributor, setContributor] = useState(null);

  //get the location so after we add or delete, we can refresh the page and get the updates
  const navigate = useNavigate();

  //get the title number from the params in the url, currently 1-6
  const { id } = useParams();

  const SUCCESS = (
    <>
      <Modal.Body>
        <Alert variant="success">
          Review id: {deleteId} successfully deleted.
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="success" onClick={handleHome}>
          Home
        </Button>
      </Modal.Footer>
    </>
  );

  function handleHome() {
    navigate("/");
  }



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
    }

    setValidated(true);

    //don't fetch unless there is both username and password
    if (user.userName && user.userPassword) {
      setLoading(true);
      const res = await postLogin();
      setLoading(false);

      if (res) {
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
          //we are adding
          setContributor(user.userName);
          setAdd(true);

        }
      } else {
        setErrors(["Verification failed."]);
      }
    }
  }

  async function postLogin() {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/user/login`,
        config
      );

      if (response.status === 200) {
        return true;
      } else if (response.status === 404) {
        return false;
      } else {
        return Promise.reject(
          new Error(`Unexpected status code ${response.status}`)
        );
      }
    } catch (e) {
      console.log(e);
      setErrors([e]);
    }
  }

  async function deleteReview() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/review/delete/${deleteId}`,
        {
          method: "DELETE",
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
      {add ? (
        <Modal
          show={show}
          onHide={handleClose}

          backdrop="static"
          keyboard={false}
          className="text-light bg-dark"
        >
          <AddReview id={id}
          contributor={contributor} />
        </Modal>
      ) : (
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
          {success ? SUCCESS : SUCCESS}

          {errors.length
            ? errors.map((e) => (
                <Alert variant="danger" key={e}>
                  {e}
                </Alert>
              ))
            : null}
        </Modal>
      )}
    </>
  );
}
