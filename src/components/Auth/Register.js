import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./Register.scss";
import { useForm } from "react-hook-form";
import { postUser } from "../../services/ApiServices";
import { toast } from "react-toastify";
const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    fetPostUser(data);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const fetPostUser = async (data) => {
    let res = await postUser(data?.email, data?.password, data?.username);
    if (res && res.status === 201) {
      toast.success("create account success");
    }
  };
  return (
    <div className="register-container">
      <div className="header">
        <button
          className="btn btn-primary btn-singup"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
      </div>
      <div className="content col-4">
        <div className="title ">User Account Registration</div>
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
              <label>Password (*) </label>
              <div className="form-group-password">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true, minLength: 6 })}
                  className={
                    errors.password ? "form-control is-invalid" : "form-control"
                  }
                />
                {errors.password ? (
                  <span className="des">
                    This field must be more than 6 characters
                  </span>
                ) : (
                  <span className="des"></span>
                )}
                {showPassword ? (
                  <p
                    className="icon-eye"
                    onClick={() => setShowPassword(false)}
                  >
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
                  {...register("username", { required: true, minLength: 6 })}
                  type="text"
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
            </div>
            <div>
              <button type="submit" className="btn-register">
                Register
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

export default Register;
