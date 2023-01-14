import Slider from "./Slider";
import "./Home.scss";
import { AiFillCheckCircle, AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getEightCar } from "../../services/ApiServices";
import { Col, Container, Row } from "react-bootstrap";
import ProductCar from "../ProductCar/ProductCar";
import { useNavigate } from "react-router-dom";
import bussan from "../../assets/image/gioithieu.jpg";
import Footer from "../Footer/Footer";
const Home = (props) => {
  const navigate = useNavigate();
  const [listCar, setListCar] = useState([]);
  useEffect(() => {
    fetListCar();
  }, []);
  const fetListCar = async () => {
    setTimeout(async () => {
      let res = await getEightCar();
      if (res && res.status === 200) {
        setListCar(res.data);
      }
    }, 1000);
  };
  return (
    <>
      <div className="home-container ">
        <div className="container">
          <div className="title">
            Bussan car
            <span className="icon-check">
              <AiFillCheckCircle />
            </span>
            <span className="evaluate">
              4.9
              <span className="icon-star">
                <AiFillStar />
              </span>
            </span>
          </div>
          <div className="andress">
            <span>Andress:</span>
            <p>London, opposite power supply Buckinghome</p>
          </div>
          <div className="home-slider">
            <Slider />
          </div>
          <div className="home-list-car">
            <div className="title">List of cars for sale</div>
            <Container>
              <Row className="list-product">
                {listCar &&
                  listCar.length > 0 &&
                  listCar.map((item, index) => {
                    return (
                      <ProductCar
                        sm="2"
                        md="4"
                        lg="3"
                        data={item}
                        key={`item-car-${index}`}
                      />
                    );
                  })}
              </Row>
            </Container>
            <div className="footer-list-car">
              <button
                className="btn  btn-see-more"
                onClick={() => {
                  setTimeout(() => {
                    navigate("/card-for-sale");
                  }, 400);
                }}
              >
                See more
              </button>
            </div>
          </div>
          <div className="home-intro">
            <div className="intro-title">Introduced Bussan</div>
            <div className="intro-content">
              <Row>
                <Col lg="5" className="intro-left">
                  <img
                    src={bussan}
                    alt="Bussan Car"
                    className="img-car-intro"
                  />
                </Col>
                <Col lg="7" className="intro-right">
                  <div className="intro-right-title">
                    Bussan car - Make believe
                  </div>
                  <div className="intro-right-des">
                    Currently, the market demand for used car sales is
                    increasing along with the rise of living standards as well
                    as people's income. However, in the process of researching
                    and researching the car buying and selling market, we have
                    realized that one thing that makes customers always
                    surprised by the decision to buy a used car is to do the
                    psychology. Customers are not completely satisfied with the
                    quality as well as the history of...
                  </div>
                  <div className="btn-intro-see-more ">
                    <span
                      onClick={() => {
                        setTimeout(() => {
                          navigate("/introduce");
                        }, 400);
                      }}
                    >
                      See more
                    </span>
                  </div>
                  <div className="intro-andress">
                    <span className="intro-andress-title">
                      Andress Bussan car:
                    </span>
                    <span>London, opposite power supply Buckinghome</span>
                  </div>

                  <div className="intro-phone">
                    <div className="phone-title">Phone number: </div>
                    <span>0999.999.999</span>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="app-footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
