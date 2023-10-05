import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Review from "./Review";
import GameInfo from "./GameInfo";
import GameChars from "./GameChars";
import { Container, Spinner } from "react-bootstrap";

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
  }
  return apiId;
}

const loadingSpinner = (<Spinner animation="border" role="status">
<span className="visually-hidden">Loading...</span>
</Spinner>);

export default function GamePage() {
  //get the title number from the params in the url, currently 1-6
  const { id } = useParams();

  //a state to update the page when the game changes
  const [game, setGame] = useState([]);
  const [review, setReview] = useState([]);
  const [chars, setChars] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [loadingchars, setLoadingchars] = useState(false);



  //grab the information for the update form using the ffTitleNumber params as a useEffect trigger
  useEffect(() => {
    if (id) {
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
            //navigate("/Notfound");
          } else {
            return Promise.reject(
              new Error(`Unexpected status code ${response.status}`)
            );
          }
        } catch (e) {
          console.log(e);
          setLoading(false);

          //   if (e.length) {
          //     setErrors(e);
          //   } else {
          //     setErrors([e]);
          //   }
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
        } else if (response.status === 404) {
            console.log(data);
            //navigate("/Notfound");
          } else {
            return Promise.reject(
              new Error(`Unexpected status code ${response.status}`)
            );
          }
        } catch (e) {
          console.log(e);
          setLoadingReviews(false);

          //   if (e.length) {
          //     setErrors(e);
          //   } else {
          //     setErrors([e]);
          //   }
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
            //navigate("/Notfound");
          } else {
            return Promise.reject(
              new Error(`Unexpected status code ${response.status}`)
            );
          }
        } catch (e) {
          console.log(e);
          setLoadingchars(false);

          //   if (e.length) {
          //     setErrors(e);
          //   } else {
          //     setErrors([e]);
          //   }
        }
      }
      getReview();
    }
  }, [id]);

  return (
    <Container>
      {loading ? (loadingSpinner) : <GameInfo game={game} />}
      {loadingReviews ? (loadingSpinner) : <Review review={review} />}
      {loadingchars ? (loadingSpinner) : <GameChars chars={chars} />}
    </Container>
  );
}
