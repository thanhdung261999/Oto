import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UploadImage } from "../../Icon/Icon";
import "./ModalUpdateUser.scss";
import { toast } from "react-toastify";
import { updateUser } from "../../../services/ApiServices";
const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdate, setDataUpdate, fetAllUser } = props;
  useEffect(() => {
    reset({
      username: dataUpdate?.username,
      email: dataUpdate?.email,
      role: dataUpdate?.role,
    });
  }, [dataUpdate]);
  const handleClose = () => {
    setDataUpdate({});
    setShow(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});
  const onSubmit = (data) => {
    fetUpdateUser(data);
  };

  const fetUpdateUser = async (data) => {
    let res = await updateUser(
      dataUpdate?.id,
      data.email,
      data.username,
      data.role
    );
    if (res && res.status === 200) {
      toast.success("Update success car ");
      handleClose();
      fetAllUser();
    }
  };

  return (
    <div>
      <div
        className="modal show "
        style={{ display: "block", position: "initial" }}
      >
        <Modal
          show={show}
          onHide={() => {
            handleClose();
          }}
          size="lg"
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Update the car</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group form-update ">
                <label>Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className={
                    errors.email
                      ? "form-control is-invalid input"
                      : "form-control input"
                  }
                />
                {errors.email ? (
                  <span className="des">This field must be email</span>
                ) : (
                  <span className="des"></span>
                )}
              </div>
              <div className="form-group form-update">
                <label>Username</label>
                <input
                  type="text"
                  {...register("username", { required: true, minLength: 6 })}
                  className={
                    errors.username ? "form-control is-invalid" : "form-control"
                  }
                />
                {errors.username ? (
                  <span className="des">
                    This field must be more than 6 characters
                  </span>
                ) : (
                  <span className="des"></span>
                )}
              </div>
              <div className="form-group form-update col-lg-6">
                <label>Role</label>
                <div></div>
                <select
                  {...register("role", { required: true })}
                  className="form-control"
                >
                  <option value={"User"}>User</option>
                  <option value={"Admin"}>Admin</option>
                </select>
              </div>
              <button type="submit" className="btn btn-success btn-submit">
                Save Changes
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default ModalUpdateUser;
