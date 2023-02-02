import axios from '../utils/axiosCiustome';
export const getCarWithNumber = (number) => {
  return axios.get(`/cars?_start=0&_end=${number}`);
};
export const getAllCar = () => {
  return axios.get('/cars');
};
export const getDetailsCar = (id) => {
  return axios.get(`/cars/${id}`);
};
export const getAllCarWithBrandModelSortByPrice = (brand, arrange, model = '') => {
  return axios.get(`/cars?car_brand=${brand}${model ? '&car_model=' + model : ''}&_sort=price&_order=${arrange}`);
};
export const getAllCarWithBrandModel = (brand, model) => {
  return axios.get(`/cars?car_brand=${brand}&car_model=${model}`);
};
export const getAllCarWithBrand = (brand) => {
  return axios.get(`/cars?car_brand=${brand}`);
};
export const getAllBrandCar = () => {
  return axios.get('/brandCars');
};
export const getAllModelcar = (nameBrand) => {
  return axios.get(`/brandCars?name=${nameBrand}`);
};
export const postCar = (data) => {
  return axios.post('/cars', {
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
    timeUpdate: '',
    view: 0,
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
  timeUpdate,
  view,
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
    view,
  });
};
export const patchViewCar = (id, view) => {
  return axios.patch(`/cars/${id}`, { view });
};
export const postUser = (email, password, username) => {
  const role = 'User';
  return axios.post('/users', {
    email,
    password,
    username,
    role,
  });
};

export const getUser = (email, password) => {
  return axios.get(`/users/?email=${email}&password=${password}`);
};

export const getAllUser = () => {
  return axios.get(`/users`);
};

export const deleteUser = (id) => {
  return axios.delete(`/users/${id}`);
};
export const updateUser = (id, email, username, role) => {
  return axios.patch(`/users/${id}`, {
    email,
    username,
    role,
  });
};

export const isEmailRegister = (email) => {
  return axios.get(`users?email=${email}`);
};
