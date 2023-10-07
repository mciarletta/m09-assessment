import { useParams, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import Review from "./Review";
import GameInfo from "./GameInfo";
import GameChars from "./GameChars";
import Screenshots from "./Screenshots";
import {
  Col,
  Container,
  Row,
  Spinner,
  NavLink,
  Button,
  Collapse,
  NavItem,
} from "react-bootstrap";


//function to grab the API id information
function getApiId(titleNumber) {
  let apiId;
  switch (titleNumber) {
    case "1":
      apiId = "680fe860-7581-4149-3999-08d6b0a627a3";
      break;
    case "2":
      apiId = "9dcce46c-7779-4096-399a-08d6b0a627a3";
      break;
    case "3":
      apiId = "53da5efb-5925-409b-399b-08d6b0a627a3";
      break;
    case "4":
      apiId = "f4904ca8-8ab7-4e35-399c-08d6b0a627a3";
      break;
    case "5":
      apiId = "d6011f09-3714-4b28-399d-08d6b0a627a3";
      break;
    case "6":
      apiId = "7eb670e8-86bd-4622-399e-08d6b0a627a3";
      break;
    default:
      apiId = "";
  }
  return apiId;
}

const loadingSpinner = (
  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

export default function GamePage() {
  //for the side nav
  const descriptionRef = useRef(null);
  const characterRef = useRef(null);
  const reviewRef = useRef(null);
  const screensRef = useRef(null);
  const [open, setOpen] = useState(true);

  //get the title number from the params in the url, currently 1-6
  const { id } = useParams();

  //a state to update the page when the game changes
  const [game, setGame] = useState([]);
  const [review, setReview] = useState([]);
  const [chars, setChars] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [loadingchars, setLoadingchars] = useState(false);

  //set up a navigate 
  const navigate = useNavigate();

  //grab the information for the update form using the ffTitleNumber params as a useEffect trigger
  useEffect(() => {
    if (id) {
      if (id > 6 || id < 1){
        navigate("/notfound");
        return;
      }
      let gameId = getApiId(id);

      async function getGame() {
        setLoading(true);
        try {
          const response = await fetch(
            `https://www.moogleapi.com/api/v1/games/${gameId}`
          );

          const data = await response.json();

          if (response.status === 200) {
            setGame(data);
            setLoading(false);
          } else if (response.status === 404) {
            console.log(data);
          } else {
            return Promise.reject(
              new Error(`Unexpected status code ${response.status}`)
            );
          }
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      }
      getGame();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      async function getReview() {
        setLoadingReviews(true);

        try {
          const response = await fetch(
            `http://localhost:8080/api/review/${id}`
          );

          const data = await response.json();

          if (response.status === 200) {
            setReview(data);
            setLoadingReviews(false);
          } else if (response.staus === 404) {
            console.log(data);
            setReview([]);
          } else {
            return Promise.reject(
              new Error(`Unexpected status code ${response.status}`)
            );
          }
        } catch (e) {
          console.log(e);
          setReview([]);
          setLoadingReviews(false);
        }
      }
      getReview();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      async function getReview() {
        setLoadingchars(true);

        try {
          const response = await fetch(
            `https://www.moogleapi.com/api/v1/characters/search?origin=${id}`
          );

          const data = await response.json();

          if (response.status === 200) {
            setChars(data);
            setLoadingchars(false);
          } else if (response.status === 404) {
            console.log(data);
          } else {
            return Promise.reject(
              new Error(`Unexpected status code ${response.status}`)
            );
          }
        } catch (e) {
          console.log(e);
          setLoadingchars(false);
        }
      }
      getReview();
    }
  }, [id]);

  const goToDesc = () => {
    descriptionRef.current.scrollIntoView();
  };

  const goToCchars = () => {
    characterRef.current.scrollIntoView();
  };

  const goToRevies = () => {
    reviewRef.current.scrollIntoView();
  };

  const gotToScreens = () => {
    screensRef.current.scrollIntoView();
  };
  return (
    <>
      <Container fluid="xxl">
        <Row>
          <Col>
            <div ref={descriptionRef}></div>
            {loading ? loadingSpinner : <GameInfo game={game} />}
            <div ref={reviewRef}></div>

            {loadingReviews ? loadingSpinner : <Review review={review} />}
            <div ref={characterRef}></div>

            {loadingchars ? loadingSpinner : <GameChars chars={chars} />}
            <div ref={screensRef}></div>

            <Screenshots gameId={id} />
          </Col>

          <Col className="col-auto pr-3">
            <div className="position-sticky top-50 end-0 p-0">
              <Row className=" px-0">
                <Col>
                  <Button
                    className="translate-middle-y"
                    variant="outline-primary"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    {open ? ">" : "<"}
                  </Button>
                  <Collapse in={open} dimension="width">
                    <NavItem>
                      <NavLink className="sideNav" onClick={goToDesc}>Description</NavLink>
                      <NavLink className="sideNav" onClick={goToRevies}>Reviews</NavLink>
                      <NavLink className="sideNav" onClick={goToCchars}>Characters</NavLink>
                      <NavLink className="sideNav" onClick={gotToScreens}>Screenshots</NavLink>
                    </NavItem>
                  </Collapse>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
