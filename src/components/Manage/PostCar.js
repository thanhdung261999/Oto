import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getAllBrandCar, getAllModelcar, postCar } from '../../services/ApiServices';
import { UploadImage } from '../Icon/Icon';
const PostCar = (props) => {
  const [preViewImage1, setPreViewImage1] = useState('');
  const [preViewImage2, setPreViewImage2] = useState('');
  const [preViewImage3, setPreViewImage3] = useState('');
  const [listBrandCar, setListBrandCar] = useState([]);
  const [listModelCar, setListModelCar] = useState({});
  useEffect(() => {
    fetListBrand();
  }, []);
  const fetListBrand = async () => {
    const res = await getAllBrandCar();
    if (res && res.status === 200) {
      let name = [];
      if (!_.isEmpty(res.data)) {
        res.data.forEach((item) => {
          name.push(item.name);
        });
      }
      setListBrandCar(name);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
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
      file1: null,
      file2: null,
      file3: null,
    },
  });
  const onSubmit = (data) => {
    fetchPostCar(data);
  };

  const fetchPostCar = async (data) => {
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
    const timePost = `${curDate.getDate()}/${curDate.getMonth() + 1}/${curDate.getFullYear()}`;
    const dataClone = _.cloneDeep(data);
    let imageFiles = [];
    imageFiles.push(preViewImage1, preViewImage2, preViewImage3);
    delete dataClone.file1;
    delete dataClone.file2;
    delete dataClone.file3;
    dataClone.price = _.toNumber(dataClone.price);
    dataClone.timePost = timePost;
    dataClone.imageFiles = imageFiles;
    const res = await postCar(dataClone);
    if (res && res.status === 201) {
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
      setPreViewImage1('');
      setPreViewImage2('');
      setPreViewImage3('');
      toast.success('Post success ');
      setTimeout(() => {}, 1000);
      setTimeout(() => {
        window.location.href = '/manage';
      }, 1000);
    }
  };
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
  const handleValid = (e) => {
    if (!errors.name) {
      e.target.classList.add('is-valid');
    } else {
      e.target.classList.remove('is-valid');
    }
  };
  const handleSetModelCar = async (brandCar) => {
    let res = await getAllModelcar(brandCar);
    if (res && res.status === 200) {
      let model = res.data[0].model;
      setListModelCar(model);
    }
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
  return (
    <>
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
              onInput={(e) => {
                handleSetModelCar(e.target.value);
              }}
              className={`form-control input ${errors.car_brand ? 'is-invalid' : ''}`}
              {...register('car_brand', { required: true })}
            >
              <option>Please choose</option>
              {listBrandCar &&
                listBrandCar.length > 0 &&
                listBrandCar.map((item, index) => (
                  <option key={`brand-${index}`} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group  form-group-post col-md-2">
            <label className="label">Car Modal &#40;selected&#41;</label>
            <select
              className={`form-control input ${errors.car_model ? 'is-invalid' : ''}`}
              {...register('car_model', { required: true })}
            >
              {listModelCar &&
                listModelCar.length > 0 &&
                listModelCar.map((item, index) => {
                  return (
                    <option key={`model-${index}`} value={item}>
                      {item}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group form-group-post col-md-2 ">
            <label className="label">Status &#40;selected&#41;</label>
            <select
              className={`form-control input ${errors.status ? 'is-invalid' : ''}`}
              {...register('status', { required: true })}
            >
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
              {...register('price', { required: true })}
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
              {...register('color', { required: true })}
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
              {...register('publishing_year', { required: true, maxLength: 5 })}
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
              {...register('km_traveled', { required: true })}
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
              placeholder="national"
              {...register('national', { required: true })}
              onInput={(e) => {
                handleValid(e);
              }}
            />
          </div>
          <div className="form-group form-group-post col-md-2 ">
            <label className="label">Car gearbox &#40;selected&#41;</label>

            <select
              className={`form-control selected input  ${errors.publishing_year ? 'is-invalid' : ''} `}
              {...register('gear', { required: true })}
            >
              <option value="Auto">Auto</option>
              <option value="MT">MT</option>
              <option value="CVT">CVT </option>
              <option value="DCT">DCT</option>
              <option value="DSG">DSG</option>
              <option value="AMT">AMT</option>
            </select>
          </div>
        </div>

        <div className="form-group form-group-post col-md-6 ">
          <label className="label">Place of sale </label>
          <input
            type="text"
            className={`form-control input  ${errors.andress ? 'is-invalid' : ''} `}
            placeholder="Andress"
            {...register('andress', { required: true })}
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
            {...register('description', { required: true, minLength: 10 })}
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
            {...register('file1', { required: true })}
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
          <div className={`col-md-12 img-preview${errors && errors.file1 ? ' error' : ''}`}>
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
            {...register('file2', { required: true })}
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
          <div className={`col-md-12 img-preview${errors.file2 ? ' error' : ''}`}>
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
            {...register('file3', { required: true })}
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
          <div className={`col-md-12 img-preview${errors.file3 ? ' error' : ''}`}>
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
          Post
        </button>
      </form>
    </>
  );
};

export default PostCar;
