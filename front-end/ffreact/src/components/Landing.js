import { Container, Row, Col, Image } from "react-bootstrap";
import "../assets/css/landing.css";
import Celes from "../assets/photos/CelesBG.png";
import ff1logo from "../assets/photos/ff1.png";
import ff2logo from "../assets/photos/ff2.png";
import ff3logo from "../assets/photos/ff3.png";
import ff4logo from "../assets/photos/ff4.png";
import ff5logo from "../assets/photos/ff5.png";
import ff6logo from "../assets/photos/ff6.png";

function Landing() {
  return (
    <Container fluid>
      <Row>
        <Col xs={6} md={3}>
          <Image src={ff1logo} thumbnail className="logo" />
          <Image src={ff3logo} thumbnail className="logo" />
          <Image src={ff5logo} thumbnail className="logo" />
        </Col>
        <Col xs={6} md={3}>
          <Image src={ff2logo} thumbnail className="logo" />
          <Image src={ff4logo} thumbnail className="logo" />
          <Image src={ff6logo} thumbnail className="logo" />
        </Col>
        <Col xs={6}>
          <Image src={Celes} fluid />
        </Col>
      </Row>
    </Container>
  );
}

export default Landing;
