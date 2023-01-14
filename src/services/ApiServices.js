import axios from "../utils/axiosCiustome";
export const getEightCar = () => {
  return axios.get("/cars?_start=0&_end=8");
};
export const getAllCar = () => {
  return axios.get("/cars");
};
export const getAllCarWithBrandModel = (brand, model) => {
  return axios.get(`/cars?car_brand=${brand}&car_model=${model}`);
};
export const getAllCarWithBrand = (brand) => {
  return axios.get(`/cars?car_brand=${brand}`);
};

export const getAllBrandCar = () => {
  return axios.get("/brandCars");
};
export const getAllModelcar = (nameBrand) => {
  return axios.get(`/brandCars?name=${nameBrand}`);
};
export const postCar = (data) => {
  return axios.post("/cars", {
    title: data?.title,
    car_brand: data?.car_brand,
    car_model: data?.car_model,
    price: data?.price,
    status: data?.status,
    color: data?.color,
    publishing_year: data?.publishing_year,
    km_traveled: data?.km_traveled,
    gear: data?.gear,
    andress: data?.andress,
    description: data?.description,
    imageFiles: data?.imageFiles,
    timePost: data?.timePost,
    national: data?.national,
    timeUpdate: "",
  });
};
export const deleteCar = (id) => {
  return axios.delete(`/cars/${id}`);
};
export const updateCar = (
  id,
  title,
  car_brand,
  car_model,
  price,
  status,
  color,
  publishing_year,
  km_traveled,
  gear,
  andress,
  description,
  imageFiles,
  timePost,
  national,
  timeUpdate
) => {
  return axios.put(`/cars/${id}`, {
    title,
    car_brand,
    car_model,
    price,
    status,
    color,
    publishing_year,
    km_traveled,
    gear,
    andress,
    description,
    imageFiles,
    timePost,
    national,
    timeUpdate,
  });
};
