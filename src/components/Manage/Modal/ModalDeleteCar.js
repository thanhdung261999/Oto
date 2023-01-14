import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteCar } from "../../../services/ApiServices";
const ModalDeleteCar = (props) => {
  const { show, setShow, dataDelete, fetAllCar } = props;
  const handleClose = () => setShow(false);
  const handleDeleteCar = async () => {
    const res = await deleteCar(dataDelete.id);
    if (res && res.status === 200) {
      handleClose();
      fetAllCar();
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
            <div>Delete car sale</div>
            <div>name is :{dataDelete.name}</div>
            <div>Price: {dataDelete.price}</div>
            <div>Style: {dataDelete.qstyle}</div>
            <div>Time Post : {dataDelete.timePost}</div>
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
export default ModalDeleteCar;
