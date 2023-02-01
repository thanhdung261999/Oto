import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.scss';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { getUser } from '../../services/ApiServices';
import _ from 'lodash';
import nProgress from 'nprogress';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisable] = useState(false);
  const navigate = useNavigate();
  const isTabletAndMobile = useMediaQuery({
    query: '(max-width : 1023px)',
  });
  useEffect(() => {
    nProgress.start();
    setTimeout(() => {
      nProgress.done();
    }, 1000);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = async (data) => {
    setIsLoading(true);
    const res = await getUser(data?.email, data?.password);
    if (res && res.status === 200) {
      if (_.isEmpty(res.data)) {
        setTimeout(() => {
          setIsLoading(false);
          setDisable(true);
          toast.error('Error wrong account information');
          return;
        }, 3000);
      } else {
        toast.success('Login success');
        let dataUser = res?.data[0];
        localStorage.setItem(
          'USER',
          JSON.stringify({
            email: dataUser?.email,
            role: dataUser?.role,
            username: dataUser?.username,
            isAuth: true,
          }),
        );
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setDisable(true);
        toast.error('Error wrong account information');
      }, 3000);
    }
  };
  const handleKeyDownLogin = (e) => {
    if (e.key === 'Enter') {
    }
  };
  const onSubmit = (data) => {
    handleLogin(data);
  };
  return (
    <div className="login-container">
      <div className={`header ${isTabletAndMobile ? 'header-mb-tb' : ''}`}>
        <button className="btn btn-danger btn-login" onClick={() => navigate('/register')}>
          Sign up
        </button>
      </div>
      <div className="content col-12 col-lg-4 col-sm-8 col-md-8">
        <div className="title ">Car Account Login</div>
        <div className="welcome ">Welcome to Bussan</div>
        <div className="content-form  ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className={errors.email || disabled ? 'form-control is-invalid' : 'form-control'}
                onInput={() => {
                  setDisable(false);
                }}
              />
              {errors.email ? <span className="des">This field must be email</span> : <span className="des"></span>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                {...register('password', { required: true, minLength: 6 })}
                className={errors.password || disabled ? 'form-control is-invalid' : 'form-control'}
                onInput={() => {
                  setDisable(false);
                }}
                onKeyDown={(e) => {
                  handleKeyDownLogin(e);
                }}
              />
              {errors.password ? (
                <span className="des">This field must be more than 6 characters</span>
              ) : (
                <span className="des"></span>
              )}
            </div>
            <span className="forgot-password">Forgot Password ?</span>
            <div>
              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading === true && <AiOutlineLoading3Quarters className="loading-icon" />}
                Log in
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

export default Login;
