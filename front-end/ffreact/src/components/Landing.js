import { Container, Image } from "react-bootstrap";
import Celes from "../assets/photos/CelesBG.png";

function Landing() {
  return (
    <Container fluid className="my-4 d-flex justify-content-end">
      <Image src={Celes} fluid />
    </Container>
  );
}

export default Landing;
