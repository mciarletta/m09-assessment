import { Carousel, Row, Col } from "react-bootstrap";

export default function Screenshots({ gameId }) {
  return (
    <div className="border border-5 border-rounded-5 border-secondary shadow-sm p-2 my-2">
    <Row >
        <Col className="d-flex justify-content-center">
          <h1>Screenshots</h1>
        </Col>
      </Row>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + `/screenshots/ff${gameId}/1.jpg`}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + `/screenshots/ff${gameId}/2.jpg`}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + `/screenshots/ff${gameId}/3.jpg`}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + `/screenshots/ff${gameId}/4.jpg`}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + `/screenshots/ff${gameId}/5.jpg`}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + `/screenshots/ff${gameId}/6.jpg`}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </div>
  );
}
