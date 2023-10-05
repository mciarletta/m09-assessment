import { Card, Row, Col, ListGroup, Accordion, Container } from "react-bootstrap";

export default function GameChars({ chars }) {
  return (
    <div className="border border-5 border-rounded-5">
      <h1>Characters:</h1>
      <Row xs={1} md={2} lg={3} xl={4}>
        {chars.map((char) => (
          <Col key={char.id} className="my-2">
            <Card bg={'dark'}>
              <Row>
                <Col>
                  <Card.Img
                    variant="top"
                    src={char.pictures.map((pic) => pic.url)}
                    className="m-2"
                  />
                </Col>

                <Col xs={8}  className="m-2">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Stats</Accordion.Header>
                      <Accordion.Body>
                        <ui className="list-group-flush">
                          <li>Age: {char.age}</li>
                          <li>Gender: {char.gender}</li>
                          <li>Race: {char.race}</li>
                          <li>Job: {char.job}</li>
                          <li>Height: {char.height}</li>
                          <li>Weight: {char.weight}</li>
                        </ui>
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
