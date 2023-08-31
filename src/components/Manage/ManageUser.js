import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUser } from '../../services/ApiServices';
import ModalDeleteUser from './Modal/ModelDeleteUser';
import './ManageUser.scss';
import ModalUpdateUser from './Modal/ModelUpdateUser';
import nProgress from 'nprogress';
const ManageUser = (props) => {
  const [listCar, setListCar] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  useEffect(() => {
    nProgress.start();
    setTimeout(() => {
      nProgress.done();
    }, 1000);
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    fetAllUser();
  }, []);
  const fetAllUser = async () => {
    const res = await getAllUser();
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
    <div className="user-container">
      <h4 className="title">Manage User</h4>
      <table className="table table-hover table-bordered mt-3 size-xl">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listCar &&
            listCar.length > 0 &&
            listCar.map((user, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td className="list-action">
                    <button
                      className="btn btn-warning fs"
                      style={{ margin: '0 10px 0 5px' }}
                      onClick={() => {
                        handleShowModaleUpdate(user);
                      }}
                    >
                      Update
                    </button>
                    {user.email !== 'trinhquy55555@gmail.com' && (
                      <button
                        className="btn btn-danger fs"
                        onClick={() => {
                          handleShowModaleDelete(user);
                        }}
                      >
                        Delete
                      </button>
                    )}
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
      <ModalDeleteUser
        show={showModalDelete}
        setShow={setShowModalDelete}
        dataDelete={dataDelete}
        fetAllUser={fetAllUser}
      />
      <ModalUpdateUser
        show={showModalUpdate}
        setShow={setShowModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetAllUser={fetAllUser}
      />
    </div>
  );
};
export default ManageUser;
