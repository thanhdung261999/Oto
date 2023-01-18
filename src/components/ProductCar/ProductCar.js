import "./ProductCar.scss";
import Col from "react-bootstrap/Col";
import {
  AiFillDollarCircle,
  AiOutlineRise,
  AiOutlineCar,
} from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patchViewCar } from "../../services/ApiServices";

const ProductCar = (props) => {
  const [isShowBtn, setIsShowBtn] = useState(false);
  const navigate = useNavigate();
  const { data } = props;
  const handleNavigate = async () => {
    await patchViewCar(data.id, data.view + 1);
    navigate(`/card-for-sale/:${data && data.id}`);
  };
  return (
    <>
      <Col className="item-product" sm={props.sm} md={props.md} lg={props.lg}>
        <div className="product">
          <div className="brand">Bussan</div>
          <div
            className="prd-image"
            onClick={() => {
              handleNavigate();
            }}
          >
            <img
              src={data && data.imageFiles && data.imageFiles[0]}
              alt="car"
            />
          </div>
          <div className="product-content">
            <div
              className="prd-title"
              onClick={() => {
                handleNavigate();
              }}
            >
              {data && data.title}
            </div>
            <div className="prd-price">
              <AiFillDollarCircle className="icon-dola" />
              <span>{data && data.price}</span>
            </div>
            <ul className="prd-description">
              <li>
                <AiOutlineCar className="icon" />
                <span> {data && data.km_traveled}km</span>
              </li>

              <li>
                {data && data.gear ? (
                  <>
                    <AiOutlineRise className="icon" />
                    <span>{data && data.gear ? data.gear : ""}</span>
                  </>
                ) : (
                  ""
                )}
              </li>
            </ul>
            <button
              className=" btn-contact"
              onClick={() => {
                setIsShowBtn((pre) => !pre);
              }}
            >
              {isShowBtn ? "0999 999 999" : "Contact"}
            </button>
          </div>
        </div>
      </Col>
    </>
  );
};
export default ProductCar;
