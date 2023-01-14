import Select from "react-select";
import { useState, useEffect } from "react";
import { getAllBrandCar, getAllModelcar } from "../../services/ApiServices";
import _ from "lodash";
const LeftContent = (props) => {
  const [listBrandCar, setListBrandCar] = useState([]);
  const [selectedBrandOption, setSelectedBrandOption] = useState(null);
  const [selectedModelOption, setSelectedModelOption] = useState(null);
  const [listModelCar, setListModelCar] = useState([]);
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
    if (selectedBrandOption && selectedBrandOption.value) {
      let res = await getAllModelcar(selectedBrandOption?.value);
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
    <div
      className={`left-content col-4 ${props.className ? props.className : ""}`}
    >
      <div className="title">
        <div>Nhận báo giá</div>
      </div>
      <Select
        defaultValue={selectedBrandOption}
        onChange={setSelectedBrandOption}
        options={listBrandCar ? listBrandCar : []}
        placeholder="Choose car company"
      />
      <Select
        defaultValue={selectedModelOption}
        onChange={setSelectedModelOption}
        options={listModelCar ? listModelCar : ""}
        placeholder="Choose car model"
      />
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
