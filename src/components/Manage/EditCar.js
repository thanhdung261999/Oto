import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCar } from "../../services/ApiServices";
import ModalDeleteCar from "./Modal/ModalDeleteCar";
import ModalUpdateCar from "./Modal/ModalUpdateCar";
const EditCar = (props) => {
  const [listCar, setListCar] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetAllCar();
  }, []);
  const fetAllCar = async () => {
    const res = await getAllCar();
    if (res && res.status === 200) {
      setListCar(res.data.reverse());
    }
  };

  const handleShowModaleDelete = (car) => {
    setShowModalDelete(true);
    setDataDelete(car);
  };
  const handleShowModaleUpdate = (car) => {
    setShowModalUpdate(true);
    setDataUpdate(car);
  };
  return (
    <div className="edit-container">
      <h4 className="title-edit">Manage Car</h4>
      <table className="table table-hover table-bordered mt-3">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Model</th>
            <th scope="col">Gear</th>
            <th scope="col">Post time</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listCar &&
            listCar.length > 0 &&
            listCar.map((car, index) => {
              return (
                <tr key={`table-car-${index}`}>
                  <th scope="row">{index + 1}</th>
                  <td>{car.title}</td>
                  <td>{car.price}</td>
                  <td>{car.car_model}</td>
                  <td>{car.gear}</td>
                  <td>{car.timePost}</td>

                  <td>
                    <button
                      className="btn btn-secondary fs"
                      style={{ margin: "0 5px 0 5px " }}
                      onClick={() => {
                        navigate(`/card-for-sale/:${car.id}`);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning fs"
                      style={{ margin: "0 10px 0 5px" }}
                      onClick={() => {
                        handleShowModaleUpdate(car);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger fs"
                      onClick={() => {
                        handleShowModaleDelete(car);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listCar && listCar.length === 0 && (
            <tr>
              <th colSpan="5">Not found data</th>
            </tr>
          )}
        </tbody>
      </table>
      <ModalDeleteCar
        show={showModalDelete}
        setShow={setShowModalDelete}
        dataDelete={dataDelete}
        fetAllCar={fetAllCar}
      />
      <ModalUpdateCar
        show={showModalUpdate}
        setShow={setShowModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetAllCar={fetAllCar}
      />
    </div>
  );
};
export default EditCar;
