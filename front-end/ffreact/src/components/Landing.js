import { Container, Row, Col, Image } from "react-bootstrap";
import { Player } from "video-react";
import React, { useState } from "react";
import "../assets/css/landing.css";
import "/node_modules/video-react/dist/video-react.css";
import Celes from "../assets/photos/CelesBG.png";
import ff1logo from "../assets/photos/ff1.png";
import ff2logo from "../assets/photos/ff2.png";
import ff3logo from "../assets/photos/ff3.png";
import ff4logo from "../assets/photos/ff4.png";
import ff5logo from "../assets/photos/ff5.png";
import ff6logo from "../assets/photos/ff6.png";
import ff1video from "../assets/videos/ff-1.mp4";
import ff2video from "../assets/videos/ff-2.mp4";
import ff3video from "../assets/videos/ff-3.mp4";
import ff4video from "../assets/videos/ff-4.mp4";
import ff5video from "../assets/videos/ff-5.mp4";
import ff6video from "../assets/videos/ff-6.mp4";

function Landing() {
  const [selectedContent, setSelectedContent] = useState("default");

  const handleMenuClick = (contentKey) => {
    setSelectedContent(contentKey);
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={6} md={3}>
          <Image
            src={ff1logo}
            thumbnail
            className="logo"
            onClick={() => handleMenuClick("content1")}
          />
          <Image
            src={ff3logo}
            thumbnail
            className="logo"
            onClick={() => handleMenuClick("content3")}
          />
          <Image
            src={ff5logo}
            thumbnail
            className="logo"
            onClick={() => handleMenuClick("content5")}
          />
        </Col>
        <Col xs={6} md={3}>
          <Image
            src={ff2logo}
            thumbnail
            className="logo"
            onClick={() => handleMenuClick("content2")}
          />
          <Image
            src={ff4logo}
            thumbnail
            className="logo"
            onClick={() => handleMenuClick("content4")}
          />
          <Image
            src={ff6logo}
            thumbnail
            className="logo"
            onClick={() => handleMenuClick("content6")}
          />
        </Col>
        <Col xs={6}>
          {selectedContent === "default" && <Image src={Celes} fluid />}
          {selectedContent === "content1" && (
            <div>
              <Player playsInline src={ff1video} autoPlay={true} />
            </div>
          )}
          {selectedContent === "content2" && (
            <div>
              <Player playsInline src={ff2video} autoPlay={true} />
            </div>
          )}
          {selectedContent === "content3" && (
            <div>
              <Player playsInline src={ff3video} autoPlay={true} />
            </div>
          )}
          {selectedContent === "content4" && (
            <div>
              <Player playsInline src={ff4video} autoPlay={true} />
            </div>
          )}
          {selectedContent === "content5" && (
            <div>
              <Player playsInline src={ff5video} autoPlay={true} />
            </div>
          )}
          {selectedContent === "content6" && (
            <div>
              <Player playsInline src={ff6video} autoPlay={true} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Landing;
