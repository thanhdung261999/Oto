import Carousel from "react-bootstrap/Carousel";
import slider1 from "../../assets/image/1.jpg";
import slider2 from "../../assets/image/2.jpg";
import slider3 from "../../assets/image/3.jpg";
import { NextIconSlider, PrevIconSlider } from "../Icon/Icon";
const Slider = (props) => {
  const IMAGE = [slider1, slider2, slider3];
  return (
    <>
      <Carousel
        interval={3000}
        pause={"hover"}
        prevIcon={<PrevIconSlider />}
        nextIcon={<NextIconSlider />}
      >
        {IMAGE &&
          IMAGE.length > 0 &&
          IMAGE.map((img, index) => {
            return (
              <Carousel.Item key={`carousel-item-${index}`}>
                <div className="slider-item">
                  <img
                    className="d-block w-100 img-slider"
                    src={img}
                    alt="carousel"
                  />
                </div>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </>
  );
};
export default Slider;
