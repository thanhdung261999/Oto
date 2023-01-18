import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.scss";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { getUser } from "../../services/ApiServices";
import _ from "lodash";

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
        toast.error("Error wrong account information");
      } else {
        toast.success("Login success");
        let dataUser = res?.data[0];
        localStorage.setItem(
          "USER",
          JSON.stringify({
            email: dataUser?.email,
            role: dataUser?.role,
            username: dataUser?.username,
            isAuth: true,
          })
        );
        navigate("/");
      }
    } else {
      toast.error("Error wrong account information");
    }
    setIsLoading(false);
  };
  const handleKeyDownLogin = (e) => {
    if (e.key === "Enter") {
    }
  };
  const onSubmit = (data) => {
    handleLogin(data);
  };
  return (
    <div className="login-container">
      <div className="header">
        <button
          className="btn btn-danger btn-login"
          onClick={() => navigate("/register")}
        >
          Sign up
        </button>
      </div>
      <div className="content col-4">
        <div className="title ">Car Account Login</div>
        <div className="welcome ">Welcome to Bussan</div>
        <div className="content-form  ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className={
                  errors.email ? "form-control is-invalid" : "form-control"
                }
              />
              {errors.email ? (
                <span className="des">This field must be email</span>
              ) : (
                <span className="des"></span>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className={
                  errors.password ? "form-control is-invalid" : "form-control"
                }
                onKeyDown={(e) => {
                  handleKeyDownLogin(e);
                }}
              />
              {errors.password ? (
                <span className="des">
                  This field must be more than 6 characters
                </span>
              ) : (
                <span className="des"></span>
              )}
            </div>
            <span className="forgot-password">Forgot Password ?</span>
            <div>
              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading === true && (
                  <AiOutlineLoading3Quarters className="loading-icon" />
                )}
                Log in
              </button>
            </div>
          </form>
          <div className="text-center" onClick={() => navigate("/")}>
            <span className="back">&#60;&#60; Go to Back Home</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
