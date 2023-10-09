import { Container, Row, Col, Image, Card } from "react-bootstrap";
import Yuffie from "../assets/photos/Yuffie.png";
import Rydia from "../assets/photos/rydia.png";


const teamInfo = {
  teamName: "Final Fantasy Devs",
  description:
    "We are a passionate group of developers who love Final Fantasy and aim to bring the best content to its fans.",
  members: [
    {
      id: 1,
      name: "Sawyer",
      role: "Front End Fool",
      bio: "Sawyer enjoys socks, the NFL, and Pizza Hut.",
      profilePic: Yuffie,
      socialLinks: {
        github: "https://github.com/ghost-wolves",
        linkedin: "https://www.linkedin.com/in/sawyer-beaton/",
      },
    },
    {
      id: 2,
      name: "Matt",
      role: "Back End Baby",
      bio: "Matt has lived in every country in the world. He then decided to live in New Jersey.",
      profilePic: Rydia,
      socialLinks: {
        github: "https://github.com/mciarletta/",
        linkedin: "https://www.linkedin.com/in/matthew-ciarletta-a7280721a/",
      },
    },
  ],
};
;

function AboutUs() {
  return (
    <Container>
      <div>
        <h1 className="teamTitle">{teamInfo.teamName}</h1>
        <p>{teamInfo.description}</p>

        <Row>
          {teamInfo.members.map((member) => (
            <Col md={4} key={member.id}>
              <Card className="mb-4 d-flex align-items-center">
                <Image
                  src={member.profilePic}
                  alt={member.name}
                  roundedCircle
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {member.role}
                  </Card.Subtitle>
                  <Card.Text>{member.bio}</Card.Text>
                  <a
                    href={member.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                  <br />
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default AboutUs;
