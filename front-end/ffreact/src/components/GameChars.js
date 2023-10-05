import { Card, Row, Col, ListGroup, Accordion, Container } from "react-bootstrap";

export default function GameChars({ chars }) {
  return (
    <div className="border border-5 border-rounded-5">
      <h1>Characters:</h1>
      <Row xs={1} md={2} lg={3} xl={4}>
        {chars.map((char) => (
          <Col key={char.id} className="my-2">
            <Card>
              <Row>
                <Col>
                  <Card.Img
                    variant="top"
                    src={char.pictures.map((pic) => pic.url)}
                    className="m-2"
                  />
                </Col>

                <Col xs={8}  className="m-2">
                  <Accordion flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Stats</Accordion.Header>
                      <Accordion.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item>Age: {char.age}</ListGroup.Item>
                          <ListGroup.Item>Gender: {char.gender}</ListGroup.Item>
                          <ListGroup.Item>Race: {char.race}</ListGroup.Item>
                          <ListGroup.Item>Job: {char.job}</ListGroup.Item>
                          <ListGroup.Item>Height: {char.height}</ListGroup.Item>
                          <ListGroup.Item>Weight: {char.weight}</ListGroup.Item>
                        </ListGroup>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Row>

              <Card.Body>
                <Card.Title>{char.name}</Card.Title>
                <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Description</Accordion.Header>
                    <Accordion.Body>{char.description}</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
