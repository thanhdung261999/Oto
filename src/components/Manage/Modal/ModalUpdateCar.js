import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UploadImage } from '../../Icon/Icon';
import './ModalUpdateCar.scss';
import { toast } from 'react-toastify';
import { getAllModelcar, updateCar } from '../../../services/ApiServices';
const ModalUpdateCar = (props) => {
  const { show, setShow, dataUpdate, setDataUpdate, fetAllCar } = props;
  const [preViewImage1, setPreViewImage1] = useState('');
  const [preViewImage2, setPreViewImage2] = useState('');
  const [preViewImage3, setPreViewImage3] = useState('');
  const [listModelCar, setListModelCar] = useState({});
  useEffect(() => {
    if (dataUpdate.imageFiles && dataUpdate.imageFiles[0]) {
      setPreViewImage1(dataUpdate.imageFiles[0]);
    }
    if (dataUpdate.imageFiles && dataUpdate.imageFiles[1]) {
      setPreViewImage2(dataUpdate.imageFiles[1]);
    }
    if (dataUpdate.imageFiles && dataUpdate.imageFiles[2]) {
      setPreViewImage3(dataUpdate.imageFiles[2]);
    }
    handleSetModelCar(dataUpdate.car_brand);
    let defaultValuesForm = {
      title: dataUpdate?.title,
      car_brand: dataUpdate?.car_brand,
      car_model: dataUpdate?.car_model,
      price: dataUpdate?.price,
      status: dataUpdate?.status,
      color: dataUpdate?.color,
      publishing_year: dataUpdate?.publishing_year,
      km_traveled: dataUpdate?.km_traveled,
      gear: dataUpdate?.gear,
      andress: dataUpdate?.andress,
      description: dataUpdate?.description,
      national: dataUpdate?.national,
      file1: dataUpdate && dataUpdate.imageFiles && dataUpdate.imageFiles[0] ? dataUpdate.imageFiles[0] : null,
      file2: dataUpdate && dataUpdate.imageFiles && dataUpdate.imageFiles[1] ? dataUpdate.imageFiles[1] : null,
      file3: dataUpdate && dataUpdate.imageFiles && dataUpdate.imageFiles[2] ? dataUpdate.imageFiles[2] : null,
    };
    reset(defaultValuesForm);
  }, [dataUpdate]);
  const handleSetModelCar = async (brandCar) => {
    let res = await getAllModelcar(brandCar);
    if (res && res.status === 200) {
      let data = res?.data[0]?.model;
      if (!_.isEmpty(data)) {
        for (let i = 0; i < data.length; i++) {
          if (data[i] === dataUpdate.car_model) {
            data[i] = data[0];
            data[0] = dataUpdate.car_model;
          }
        }
      }
      setListModelCar(data);
    }
  };
  const handleClose = () => {
    setDataUpdate({});
    setShow(false);
    setPreViewImage1(null);
    setPreViewImage2(null);
    setPreViewImage3(null);
    reset({
      title: '',
      car_brand: '',
      car_model: '',
      price: '',
      status: '',
      color: '',
      publishing_year: '',
      km_traveled: '',
      gear: '',
      andress: '',
      description: '',
      national: '',
      file1: '',
      file2: '',
      file3: '',
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleCloseImage = (fileReset) => {
    reset({
      fileReset: '',
    });
    switch (fileReset) {
      case 'file1':
        setPreViewImage1('');
        break;
      case 'file2':
        setPreViewImage2('');
        break;
      case 'file3':
        setPreViewImage3('');
        break;
      default:
        break;
    }
  };
  const onSubmit = (data) => {
    if (!preViewImage1) {
      toast.error('Please choose image 1');
      return;
    }
    if (!preViewImage2) {
      toast.error('Please choose image 2');
      return;
    }
    if (!preViewImage3) {
      toast.error('Please choose image 3');
      return;
    }
    const curDate = new Date();
    const timeUpdate = `${curDate.getDate()}/${curDate.getMonth() + 1}/${curDate.getFullYear()}`;
    let imageFiles = [];
    imageFiles.push(preViewImage1, preViewImage2, preViewImage3);
    const dataClone = _.cloneDeep(data);
    dataClone.price = _.toNumber(dataClone.price);
    delete dataClone.file1;
    delete dataClone.file2;
    delete dataClone.file3;
    dataClone.timeUpdate = timeUpdate;
    dataClone.imageFiles = imageFiles;
    fetUpdateCar(dataClone);
  };
  const handleError = () => {
    if (errors.file1) {
      toast.error('Please choose image 1');
      return;
    }
    if (errors.file2) {
      toast.error('Please choose image 2');
      return;
    }
    if (errors.file3) {
      toast.error('Please choose image 3');
      return;
    }
  };
  const onerror = () => {
    if (
      !(
        errors.andress &&
        errors.title &&
        errors.car_brand &&
        errors.car_model &&
        errors.color &&
        errors.description &&
        errors.km_traveled &&
        errors.gear &&
        errors.price &&
        errors.status &&
        errors.publishing_year &&
        errors.national
      )
    )
      handleError();
  };
  const fetUpdateCar = async (dataClone) => {
    let res = await updateCar(
      dataUpdate?.id,
      dataClone?.title,
      dataClone?.car_brand,
      dataClone?.car_model,
      dataClone?.price,
      dataClone?.status,
      dataClone?.color,
      dataClone?.publishing_year,
      dataClone?.km_traveled,
      dataClone?.gear,
      dataClone?.andress,
      dataClone?.description,
      dataClone?.imageFiles,
      dataUpdate?.timePost,
      dataClone?.national,
      dataClone?.timeUpdate,
      dataClone?.view,
    );
    if (res && res.status === 200) {
      toast.success('Update success car ');
      handleClose();
      fetAllCar();
    }
  };
  const handleValid = (e) => {
    if (!errors.name) {
      e.target.classList.add('is-valid');
    } else {
      e.target.classList.remove('is-valid');
    }
  };
  return (
    <div>
      <div className="modal show " style={{ display: 'block', position: 'initial' }}>
        <Modal
          show={show}
          onHide={() => {
            handleClose();
          }}
          size="xl"
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Update the car</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit, onerror)}>
              <div className="form-group  form-group-post col-md-6">
                <label className="label">Title</label>
                <input
                  type="text"
                  {...register('title', { required: true, minLength: 6 })}
                  className={`form-control input  ${errors.title ? 'is-invalid' : ''} `}
                  onInput={(e) => {
                    handleValid(e);
                  }}
                />
                <span className="des-valid  ">{errors.title ? 'Enter at least 6 characters' : ''}</span>
              </div>
              <div className="group-content">
                <div className="form-group  form-group-post col-md-2">
                  <label className="label">Car Brand &#40;selected&#41;</label>
                  <select
                    disabled
                    onInput={(e) => {}}
                    className={`form-control input ${errors.car_brand ? 'is-invalid' : ''}`}
                    {...register('car_brand', {
                      required: true,
                    })}
                  >
                    <option value={dataUpdate && dataUpdate.car_brand}>{dataUpdate && dataUpdate.car_brand}</option>
                  </select>
                </div>
                <div className="form-group  form-group-post col-md-2">
                  <label className="label">Car Model &#40;selected&#41;</label>
                  <select
                    className={`form-control input ${errors.car_model ? 'is-invalid' : ''}`}
                    {...register('car_model', { required: true })}
                  >
                    {listModelCar &&
                      listModelCar.length > 0 &&
                      listModelCar.map((item, index) => (
                        <option key={`model-item-${index}`} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group form-group-post col-md-2 ">
                  <label className="label">Status</label>
                  <select className="form-control input" {...register('status')}>
                    <option value="Old">Old</option>
                    <option value="New">New</option>
                  </select>
                </div>
              </div>

              <div className="group-content">
                <div className="form-group form-group-post col-md-2 ">
                  <label className="label">Price</label>
                  <input
                    type="number"
                    className={`form-control input ${errors.price ? 'is-invalid' : ''} `}
                    {...register('price', { required: true, minLength: 1 })}
                    onInput={(e) => {
                      handleValid(e);
                    }}
                  />
                </div>
                <div className="form-group form-group-post col-md-2 ">
                  <label className="label">Color </label>
                  <input
                    type="text"
                    className={`form-control input  ${errors.color ? 'is-invalid' : ''} `}
                    {...register('color', { required: true, minLength: 1 })}
                    onInput={(e) => {
                      handleValid(e);
                    }}
                  />
                </div>
                <div className="form-group form-group-post col-md-2 ">
                  <label className="label">Publishing year </label>
                  <input
                    type="number"
                    className={`form-control input  ${errors.publishing_year ? 'is-invalid' : ''} `}
                    {...register('publishing_year', {
                      required: true,
                      minLength: 1,
                    })}
                    onInput={(e) => {
                      handleValid(e);
                    }}
                  />
                </div>
              </div>
              <div className="group-content">
                <div className="form-group form-group-post col-md-2 ">
                  <label className="label">Km traveled </label>
                  <input
                    type="number"
                    className={`form-control input  ${errors.km_traveled ? 'is-invalid' : ''} `}
                    {...register('km_traveled', {
                      required: true,
                      minLength: 1,
                    })}
                    onInput={(e) => {
                      handleValid(e);
                    }}
                  />
                </div>
                <div className="form-group form-group-post col-md-2 ">
                  <label className="label">Which water car? </label>
                  <input
                    type="text"
                    className={`form-control input  ${errors.national ? 'is-invalid' : ''} `}
                    {...register('national', { required: true, minLength: 1 })}
                    onInput={(e) => {
                      handleValid(e);
                    }}
                  />
                </div>
                <div className="form-group form-group-post col-md-2 ">
                  <label className="label">Car gearbox</label>

                  <select className="form-control input" {...register('gear')}>
                    <option value="Auto">Auto</option>
                    <option value="MT">MT</option>
                    <option value="CVT">CVT </option>
                    <option value="DCT">DCT</option>
                    <option value="DSG">DSG</option>
                    <option value="AMT">AMT</option>
                  </select>
                </div>
              </div>
              {/*  */}
              <div className="form-group form-group-post col-md-6 ">
                <label className="label">Place of sale </label>
                <input
                  type="text"
                  className={`form-control input  ${errors.andress ? 'is-invalid' : ''} `}
                  placeholder="Andress"
                  {...register('andress', { required: true, minLength: 1 })}
                  onInput={(e) => {
                    handleValid(e);
                  }}
                />
              </div>

              <div className="form-group form-group-post col-md-6 ">
                <label className="label">Description </label>
                <textarea
                  style={{ resize: 'none' }}
                  placeholder="About you"
                  className={`form-control textarea ${errors.description ? 'is-invalid' : ''}`}
                  {...register('description', {
                    required: true,
                    minLength: 10,
                  })}
                  onInput={(e) => {
                    handleValid(e);
                  }}
                />
                <span className="des-valid  ">{errors.description ? 'Enter at least 10 characters' : ''}</span>
              </div>
              <div className="group-upload">
                <UploadImage htmlFor="file1" index={1} />
                <input
                  type={'file'}
                  id="file1"
                  hidden
                  {...register('file1')}
                  onInput={(event) => {
                    let stringBase64;
                    let fileReader = new FileReader();
                    fileReader.readAsDataURL(event.target.files[0]);
                    fileReader.onloadend = (e) => {
                      stringBase64 = e.target.result;
                      setPreViewImage1(stringBase64);
                    };
                  }}
                />
                <div className={`col-md-6 img-preview ${errors.file1 ? 'active' : ''}`}>
                  {preViewImage1 ? (
                    <div className="img-car">
                      <img src={preViewImage1} alt="" />
                      <span
                        className="close"
                        onClick={() => {
                          handleCloseImage('file1');
                        }}
                      >
                        X
                      </span>
                    </div>
                  ) : (
                    <span className="text-prv" style={{ fontSize: '1.5rem' }}>
                      Preview Image
                    </span>
                  )}
                </div>
              </div>
              <div className="group-upload">
                <UploadImage htmlFor="file2" index={2} />
                <input
                  type={'file'}
                  id="file2"
                  hidden
                  {...register('file2')}
                  onInput={(event) => {
                    let stringBase64;
                    let fileReader = new FileReader();
                    fileReader.readAsDataURL(event.target.files[0]);
                    fileReader.onloadend = (e) => {
                      stringBase64 = e.target.result;
                      setPreViewImage2(stringBase64);
                    };
                  }}
                />
                <div className={`col-md-6  img-preview ${errors.file2 ? 'active' : ''}`}>
                  {preViewImage2 ? (
                    <div className="img-car">
                      <img src={preViewImage2} alt="" />
                      <span
                        className="close"
                        onClick={() => {
                          handleCloseImage('file2');
                        }}
                      >
                        X
                      </span>
                    </div>
                  ) : (
                    <span className="text-prv" style={{ fontSize: '1.5rem' }}>
                      Preview Image
                    </span>
                  )}
                </div>
              </div>
              <div className="group-upload">
                <UploadImage htmlFor="file3" index={3} />
                <input
                  type={'file'}
                  id="file3"
                  hidden
                  {...register('file3')}
                  onInput={(event) => {
                    let stringBase64;
                    let fileReader = new FileReader();
                    fileReader.readAsDataURL(event.target.files[0]);
                    fileReader.onloadend = (e) => {
                      stringBase64 = e.target.result;
                      setPreViewImage3(stringBase64);
                    };
                  }}
                />
                <div className={`col-md-6 img-preview ${errors.file3 ? 'active' : ''}`}>
                  {preViewImage3 ? (
                    <div className="img-car">
                      <img src={preViewImage3} alt="" />
                      <span
                        className="close"
                        onClick={() => {
                          handleCloseImage('file3');
                        }}
                      >
                        X
                      </span>
                    </div>
                  ) : (
                    <span className="text-prv" style={{ fontSize: '1.5rem' }}>
                      Preview Image
                    </span>
                  )}
                </div>
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

export default ModalUpdateCar;
