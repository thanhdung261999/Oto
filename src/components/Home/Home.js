import Slider from './Slider';
import './Home.scss';
import { AiFillCheckCircle, AiFillStar } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { getCarWithNumber } from '../../services/ApiServices';
import { Col, Row } from 'react-bootstrap';
import ProductCar from '../ProductCar/ProductCar';
import { useNavigate } from 'react-router-dom';
import bussan from '../../assets/image/gioithieu.jpg';
import { useMediaQuery } from 'react-responsive';
import nProgress from 'nprogress';
const Home = (props) => {
  const navigate = useNavigate();
  const [listCar, setListCar] = useState([]);
  const isTablet1 = useMediaQuery({
    query: '(min-width : 740px )',
  });
  const isTablet2 = useMediaQuery({
    query: '(max-width : 1022px )',
  });
  const number = isTablet1 && isTablet2 ? 9 : 8;
  useEffect(() => {
    nProgress.start();
    setTimeout(() => {
      nProgress.done();
    }, 1000);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetListCar();
  }, [isTablet1, isTablet2]);
  const fetListCar = async () => {
    let res = await getCarWithNumber(number);
    if (res && res.status === 200) {
      setListCar(res.data);
    }
  };

  return (
    <>
      <div className="home-container ">
        <div className={`${isTablet1 && isTablet2 ? '' : 'container'}`}>
          <h1 className="title">
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
          </h1>
          <div className="andress">
            <span>Andress:</span>
            <p>London, opposite power supply Buckinghome</p>
          </div>
          <div className="home-slider">
            <Slider />
          </div>
          <div className="home-list-car">
            <div className="title">List of cars for sale</div>
            <div className="">
              <Row className="list-product">
                {listCar &&
                  listCar.length > 0 &&
                  listCar.map((item, index) => {
                    return <ProductCar xs="6" sm="6" md="4" lg="3" data={item} key={`item-car-${index}`} />;
                  })}
              </Row>
            </div>
            <div className="footer-list-car">
              <button
                className="btn  btn-see-more"
                onClick={() => {
                  setTimeout(() => {
                    navigate('/card-for-sale');
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
                  <img src={bussan} alt="Bussan Car" className="img-car-intro" />
                </Col>
                <Col lg="7" className="intro-right">
                  <div className="intro-right-title">Bussan car - Make believe</div>
                  <div className="intro-right-des">
                    The car brands currently sold at Tu Quy Auto are very diverse from many different genuine brands
                    that are loved by customers in the Vietnamese market such as: Vinfast, Toyota, Kia, Mazda, Ford,
                    Honda, Audi, Some notable brands include: Kia Seltos Toyota Fortuner, Ford Everest, Kia Sorento,
                    Honda CRV, Mazda CX5... Tu Quy Auto is extremely grateful to customers who always put their trust
                    and choice. This is a great source of authentication for us to continue to bring peace of mind and
                    the highest quality to our customers, which are cars that are always guaranteed in terms of quality
                    and service.
                  </div>
                  <div className="intro-andress">
                    <span className="intro-andress-title">Andress Bussan car:</span>
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
      </div>
    </>
  );
};

export default Home;
