import { Row, Col } from "react-bootstrap";

export default function GameInfo({ game }) {
  return (
    <div className="border border-5 shadow-sm border-secondary">
      <Row >
        <Col className="d-flex justify-content-center">
          <h1>{game.map((game) => game.title)}</h1>
        </Col>
      </Row>

      <Row md={2} className="p-2">
        <Col md={5}>
          <div>
            <img className="img-fluid" src={game.map((game) => game.picture)} />
          </div>
          <div>
            <h6>Released: {game.map((game) => game.releaseDate)}</h6>
            <h6>Platform: {game.map((game) => game.platform)}</h6>
          </div>
        </Col>
        <Col md={7}>
          <p>{game.map((game) => game.description)}</p>
        </Col>
      </Row>
    </div>
  );
}
