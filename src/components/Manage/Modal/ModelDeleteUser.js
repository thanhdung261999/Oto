import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUser } from "../../../services/ApiServices";
const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete, fetAllUser } = props;
  const handleClose = () => setShow(false);
  const handleDeleteCar = async () => {
    const res = await deleteUser(dataDelete.id);
    if (res && res.status === 200) {
      handleClose();
      fetAllUser();
      toast.success(" Delete success ");
    }
  };
  return (
    <>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm delete the car</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Delete account has email: {dataDelete?.email}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleDeleteCar();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
export default ModalDeleteUser;
