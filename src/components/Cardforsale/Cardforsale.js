import "./Cardforsale.scss";
import LeftContent from "./LeftContent";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import {
  getAllBrandCar,
  getAllCar,
  getAllCarWithBrand,
  getAllCarWithBrandModel,
  getAllModelcar,
} from "../../services/ApiServices";
import _, { conforms } from "lodash";
import ProductCar from "../ProductCar/ProductCar";
import { Row } from "react-bootstrap";
const Cardforsale = (props) => {
  const [listBrandCar, setListBrandCar] = useState([]);
  const [selectedBrandOption, setSelectedBrandOption] = useState(null);
  const [selectedModelOption, setSelectedModelOption] = useState(null);
  const [selectedPriceOption, setSelectedPriceOption] = useState(null);
  const [listModelCar, setListModelCar] = useState([]);
  const [total, setTotal] = useState(0);
  const [arrangePrice, setArrangePrrice] = useState("");
  const [listCar, setListCar] = useState([]);
  const options = [
    { value: "desc", label: "Hig`h to low" },
    { value: "asc", label: "Low tp high" },
  ];
  useEffect(() => {
    fetListBrand();
    fetListCar();
  }, []);
  const ref = useRef();
  useEffect(() => {
    if (selectedBrandOption?.value === "All") {
      fetListCar();
      setSelectedModelOption(null);
      return;
    }
    fetListCarWithBrand();
    console.log(ref.current.props);
  }, [selectedBrandOption]);
  useEffect(() => {
    if (selectedBrandOption && selectedModelOption) {
      fetListCarWithBrandModel();
    }
  }, [selectedModelOption]);

  const fetListCar = async () => {
    const res = await getAllCar();
    if (res && res.status === 200)
      if (res.data.length > 0) {
        setListCar(res.data);
        setTotal(res.data.length);
      }
  };

  const fetListCarWithBrandModel = async () => {
    // get all car with car_brand,car_model
    const res = await getAllCarWithBrandModel(
      selectedBrandOption.value,
      selectedModelOption.value
    );
    if (res && res.status === 200)
      if (res.data.length > 0) {
        setListCar(res?.data);
        setTotal(res?.data?.length);
      }
  };
  const fetListCarWithBrand = async () => {
    if (selectedBrandOption && selectedBrandOption.value) {
      let res = await getAllCarWithBrand(selectedBrandOption.value);
      if (res && res.status === 200)
        if (res.data.length > 0) {
          setListCar(res?.data);
          setTotal(res?.data?.length);
        }
    }
  };

  const fetListBrand = async () => {
    // get Brands
    const res = await getAllBrandCar();
    if (res && res.status === 200) {
      let data = [
        {
          value: "All",
          label: "All",
        },
      ];
      if (!_.isEmpty(res.data)) {
        res.data.forEach((item) => {
          let name = {
            value: item.name,
            label: item.name,
          };
          data.push(name);
        });
      }
      setListBrandCar(data);
    }
  };

  useEffect(() => {
    handleSetModelCar();
  }, [selectedBrandOption]);
  const handleSetModelCar = async () => {
    if (selectedBrandOption && selectedBrandOption.value) {
      let res = await getAllModelcar(selectedBrandOption.value);
      if (res && res.status === 200) {
        let data = [];
        res?.data[0]?.model.forEach((item) => {
          let model = {
            value: item,
            label: item,
          };
          data.push(model);
        });
        setListModelCar(data);
      }
    }
  };
  return (
    <div className="card-for-sale-container container">
      <div className="content ">
        <LeftContent className={"col-4"} />
        <div className="right-content col-8">
          <div className="title">Cars are being sold at Bussan</div>
          <div className="group-selected">
            <Select
              className="col-lg-3"
              defaultValue={selectedBrandOption}
              onChange={setSelectedBrandOption}
              options={listBrandCar ? listBrandCar : []}
              placeholder="Choose car company"
            />
            <Select
              ref={ref}
              className="col-lg-3"
              defaultValue={selectedModelOption}
              onChange={setSelectedModelOption}
              options={listModelCar ? listModelCar : ""}
              placeholder="Choose car model"
            />
            <Select
              className="col-lg-3"
              defaultValue={selectedPriceOption}
              onChange={setSelectedPriceOption}
              options={options}
              placeholder="Sort by price"
            />
          </div>
          <div className="total-car">
            There are <span>{total}</span> cars for sale
          </div>
          <Row className="list-car">
            {listCar &&
              listCar.length > 0 &&
              listCar.map((item, index) => {
                return (
                  <ProductCar
                    sm="6"
                    md="4"
                    lg="4"
                    data={item}
                    key={`item-car-for-fale-${index}`}
                  />
                );
              })}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Cardforsale;
