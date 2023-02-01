import { Carousel } from "react-responsive-carousel";
import slider1 from "../../assets/image/1.jpg";
import slider2 from "../../assets/image/2.jpg";
import slider3 from "../../assets/image/3.jpg";
const Slider = (props) => {
  return (
    <Carousel
      className="carousel"
      interval={7000}
      autoPlay
      autoFocus={true}
      transitionTime={800}
      infiniteLoop={true}
      emulateTouch={true}
      showThumbs={true}
      showArrows={true}
    >
      <div>
        <img style={{ borderRadius: "10px" }} src={slider1} />
      </div>
      <div>
        <img style={{ borderRadius: "10px" }} src={slider2} />
      </div>
      <div>
        <img style={{ borderRadius: "10px" }} src={slider3} />
      </div>
    </Carousel>
  );
};
export default Slider;
