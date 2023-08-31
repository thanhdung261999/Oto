import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import './Register.scss';
import { useForm } from 'react-hook-form';
import { isEmailRegister, postUser } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import nProgress from 'nprogress';
import _ from 'lodash';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckEmail, setIsCheckEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisable] = useState(false);

  const [otp, setOtp] = useState('');
  useEffect(() => {
    nProgress.start();
    setTimeout(() => {
      nProgress.done();
    }, 1000);
  }, []);
  const navigate = useNavigate();
  const isTabletAndMobile = useMediaQuery({
    query: '(max-width : 1023px)',
  });
  const onSubmit = (data) => {
    isEmail(data);
  };
  const isEmail = async (data) => {
    let email = data?.email?.trim();
    if (email) {
      let res = await isEmailRegister(email);
      if (res && res.status === 200) {
        setIsLoading(true);
        setDisable(true);
        if (otp !== '9999') {
          setTimeout(() => {
            toast.error('Error user authorization code');
            setIsLoading(false);
            setDisable(false);
          }, 2000);
          return;
        } else if (_.isEmpty(res.data)) {
          return fetPostUser(data);
        }
      }
      setIsCheckEmail(true);
      toast.error('Email already exists');
    }
  };
  const fetPostUser = async (data) => {
    let res = await postUser(data?.email, data?.password, data?.username?.trim());
    if (res && res.status === 201) {
      setTimeout(() => {
        setIsLoading(false);
        setDisable(false);
      }, 3000);
      setTimeout(() => {
        toast.success('create account success');
        navigate('/login');
      }, 1000);
    }
  };
  return (
    <div className="register-container">
      <div className={`header ${isTabletAndMobile ? 'header-mb-tb' : ''}`}>
        <button className="btn btn-primary btn-singup" onClick={() => navigate('/login')}>
          Log in
        </button>
      </div>
      <div className="content col-12 col-lg-4 col-sm-8 col-md-8">
        <div className="title ">User Account Registration</div>
        <div className="welcome ">Welcome to Bussan</div>
        <div className="content-form  ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className={errors.email || isCheckEmail ? 'form-control is-invalid' : 'form-control'}
                onInput={() => {
                  setIsCheckEmail(false);
                }}
              />
              {errors.email ? (
                <span className="des">This field must be email</span>
              ) : (
                <span className="des">{isCheckEmail && 'Email already exists'}</span>
              )}
            </div>
            <div className="form-group">
              <label>Password (*) </label>
              <div className="form-group-password">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: true, minLength: 6 })}
                  className={errors.password ? 'form-control is-invalid' : 'form-control'}
                />
                {errors.password ? (
                  <span className="des">This field must be more than 6 characters</span>
                ) : (
                  <span className="des"></span>
                )}
                {showPassword ? (
                  <p className="icon-eye" onClick={() => setShowPassword(false)}>
                    <FaRegEye />
                  </p>
                ) : (
                  <p className="icon-eye" onClick={() => setShowPassword(true)}>
                    <FaRegEyeSlash />
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  {...register('username', { required: true, minLength: 6 })}
                  type="text"
                  className={errors.username ? 'form-control is-invalid' : 'form-control'}
                />
                {errors.username ? (
                  <span className="des">This field must be more than 6 characters</span>
                ) : (
                  <span className="des"></span>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>User authorization code</label>
              <input
                type="text"
                className="form-control"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
              <label style={{ color: 'blue' }}>
                Contact: <a href="tel:+84799448884">+84 799448884 </a>to get the code
              </label>
            </div>
            <div>
              <button type="submit" className="btn-register" disabled={disabled}>
                {isLoading === true && <AiOutlineLoading3Quarters className="loading-icon" />}
                Register
              </button>
            </div>
          </form>
          <div className="text-center" onClick={() => navigate('/')}>
            <span className="back">&#60;&#60; Go to Back Home</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
