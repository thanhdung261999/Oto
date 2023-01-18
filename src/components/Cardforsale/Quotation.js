import Select from "react-select";
import { useState, useEffect } from "react";
import { getAllBrandCar, getAllModelcar } from "../../services/ApiServices";
import _ from "lodash";
import "./Quotation.scss";
const LeftContent = (props) => {
  const [listBrandCar, setListBrandCar] = useState([]);
  const [selectedBrandOption, setSelectedBrandOption] = useState(null);
  const [listModelCar, setListModelCar] = useState([]);
  const [selectModel, setSelectModel] = useState("");
  useEffect(() => {
    fetListBrand();
  }, []);
  const fetListBrand = async () => {
    const res = await getAllBrandCar();
    if (res && res.status === 200) {
      let data = [];
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
    const modelElement = document.querySelector("select-model");
    if (modelElement) {
      modelElement.selectIndex = 0;
      setSelectModel("");
    }
    if (selectedBrandOption && selectedBrandOption.value) {
      let res = await getAllModelcar(selectedBrandOption?.value);
      let data = ["Choose car model"];
      if (res && res.status === 200) {
        res?.data[0]?.model.forEach((item) => {
          data.push(item);
        });
        setListModelCar(data);
      }
    }
  };
  return (
    <div className={`left-content ${props.className ? props.className : ""}`}>
      <div className="title">
        <div>Get a quote</div>
      </div>
      <Select
        defaultValue={selectedBrandOption}
        onChange={setSelectedBrandOption}
        options={listBrandCar ? listBrandCar : []}
        placeholder="Choose car company"
      />
      <select
        placeholder="Choose car model"
        className="col-lg-12 select select-model"
        defaultChecked={selectModel}
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
      <div className="checkbox">
        <span>Pay :</span>
        <div>
          <label>installment</label>
          <input type="radio" name="pay" defaultChecked />
        </div>
        <div>
          <label>buy german</label>
          <input type="radio" name="pay" />
        </div>
      </div>
      <div className="form-group ">
        <input
          className="form-control input"
          type="text"
          placeholder="First and last name"
        />
      </div>
      <div className="form-group ">
        <input className="form-control input" type="text" placeholder="Phone" />
      </div>
      <div className="btn-register">
        <button className="btn btn-danger ">Register</button>
      </div>
    </div>
  );
};
export default LeftContent;
