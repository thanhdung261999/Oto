import { Col, Container, Row } from "react-bootstrap";
import "./Footer.scss";
import map from "../../assets/image/footer.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
const Footer = (props) => {
  return (
    <>
      <div className="footer-container">
        <Container>
          <Row>
            <Col lg="5" className="map">
              <img src={map} alt="map" />
            </Col>
            <Col lg="7" className="footer-right">
              <div className="footer-right-title">Bussan Car</div>
              <div className="foooter-andress mt-4">
                <FaMapMarkerAlt className="icon-ft" />
                <span className="ft-des">Andress:</span>
                <span>London, opposite power supply Buckinghome</span>
              </div>
              <div className="footer-phone mt-4">
                <AiFillPhone className="icon-ft" />
                <span className="ft-des">Phone number:</span>
                <span>0999.999.999</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Footer;
