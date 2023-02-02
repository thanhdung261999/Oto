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
const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckEmail, setIsCheckEmail] = useState(false);
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
    let res = await isEmailRegister(data?.email);
    if (res && res.status === 200) {
      if (_.isEmpty(res.data)) {
        return fetPostUser(data);
      }
    }
    setIsCheckEmail(true);
    toast.error('Email already exists');
  };
  const fetPostUser = async (data) => {
    let res = await postUser(data?.email, data?.password, data?.username);
    if (res && res.status === 201) {
      toast.success('create account success');
      setTimeout(() => {
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
            <div>
              <button type="submit" className="btn-register">
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
