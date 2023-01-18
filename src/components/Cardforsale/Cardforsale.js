import "./Cardforsale.scss";
import Quotation from "./Quotation";
import Select from "react-select";
import {
  getAllBrandCar,
  getAllCar,
  getAllCarWithBrand,
  getAllCarWithBrandModel,
  getAllModelcar,
} from "../../services/ApiServices";
import _ from "lodash";
import ProductCar from "../ProductCar/ProductCar";
import { Row } from "react-bootstrap";
import { useState, useEffect } from "react";
const Cardforsale = (props) => {
  const options = [
    { value: "", label: "Sort by price" },
    { value: "desc", label: "High to low" },
    { value: "asc", label: "Low to high" },
  ];
  const [listBrandCar, setListBrandCar] = useState([]);
  const [selectedBrandOption, setSelectedBrandOption] = useState(null);
  const [selectModel, setSelectModel] = useState("");
  const [selectArrange, setSelectArrange] = useState("");
  const [optionsArrange, setOptionsArrange] = useState(options);
  const [listModelCar, setListModelCar] = useState([]);
  const [total, setTotal] = useState(0);
  const [listCar, setListCar] = useState([]);
  useEffect(() => {
    fetListBrand();
    fetListCar();
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (selectArrange) {
      let selectArrangeElement = document.querySelector(".select-arrange");
      if (selectArrangeElement) {
        setSelectArrange("");
        selectArrangeElement.selectedIndex = 0;
      }
    }
    if (selectedBrandOption?.value === "All" || !selectedBrandOption) {
      fetListCar();
      return;
    }
    fetListCarWithBrand();
  }, [selectedBrandOption]);
  useEffect(() => {
    if (selectArrange) {
      let listCarClone = _.cloneDeep(listCar);
      const data = _.orderBy(listCar, "price", [selectArrange]);
      setListCar(data);
    }
  }, [selectArrange]);
  useEffect(() => {
    if (selectArrange) {
      let selectArrangeElement = document.querySelector(".select-arrange");
      if (selectArrangeElement) {
        setSelectArrange("");
        selectArrangeElement.selectedIndex = 0;
      }
    }

    if (
      selectedBrandOption &&
      selectModel &&
      selectModel !== "Choose car model"
    ) {
      fetListCarWithBrandModel();
    }
  }, [selectModel]);
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
      selectModel
    );
    if (res && res.status === 200) {
      if (res.data.length > 0) {
        setListCar(res?.data);
        setTotal(res?.data?.length);
      }
    }
  };
  const fetListCarWithBrand = async () => {
    setOptionsArrange([]);
    if (selectedBrandOption && selectedBrandOption.value) {
      let res = await getAllCarWithBrand(selectedBrandOption.value);
      if (res && res.status === 200)
        if (res.data.length > 0) {
          setListCar(res?.data);
          setTotal(res?.data?.length);
        }
    }
    setOptionsArrange(options);
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
    setListModelCar([]);
    if (selectedBrandOption && selectedBrandOption.value) {
      let res = await getAllModelcar(selectedBrandOption.value);
      if (res && res.status === 200) {
        let data = [];
        res?.data[0]?.model.forEach((item) => {
          data.push(item);
        });
        data[res?.data[0]?.model.length] = data[0];
        data[0] = "Choose car model";
        setListModelCar(data);
      }
    }
  };

  return (
    <div className="card-for-sale-container container">
      <div className="content ">
        <div className="col-lg-4">
          <Quotation />
        </div>
        <div className="right-content col-8">
          <div className="title">Cars are being sold at Bussan</div>
          <div className="group-selected">
            <Select
              className="col-lg-4"
              defaultValue={selectedBrandOption}
              onChange={setSelectedBrandOption}
              options={listBrandCar ? listBrandCar : []}
              placeholder="Choose car company"
            />
            <select
              placeholder="Choose car model"
              className="col-lg-3 select"
              onChange={(e) => {
                setSelectModel(e.target.value);
              }}
            >
              {listModelCar && listModelCar.length > 0 ? (
                listModelCar.map((item, index) => {
                  return (
                    <option key={`modelcar-${index}`} value={item}>
                      {item}
                    </option>
                  );
                })
              ) : (
                <option value="Choose car model">Choose car model</option>
              )}
            </select>
            <select
              placeholder="Choose car model"
              className="col-lg-3 select select-arrange"
              onChange={(e) => {
                setSelectArrange(e.target?.value);
              }}
            >
              {optionsArrange && optionsArrange.length > 0 ? (
                optionsArrange.map((item, index) => {
                  return (
                    <option key={`option-short-${index}`} value={item.value}>
                      {item.label}
                    </option>
                  );
                })
              ) : (
                <option value="Sort by price">Sort by price</option>
              )}
            </select>
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
