import React, { useState } from "react";
import "./LoginForm.css";
import { NavLink } from "react-router-dom";
import { useLogin } from "../authentication/useLogin";
import Spinner from "../components/Spinner";
import { useSignUp } from "../authentication/useSignUp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function LoginForm() {
  const [signUpMode, setSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const { signup } = useSignUp();

  function onSubmit(data) {
    console.log(data);
    signup(data, {
      onSettled: () => {
        reset();
      },
    });
  }
  

  function handleSubmit2(e) {
    e.preventDefault();

    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  const toggleSignUpMode = () => {
    setSignUpMode(!signUpMode);
  };

  return (
    <div className={`container ${signUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSubmit2}>
            <h2 className="title">ورود</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="email"
                placeholder="ایمیل"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <button type="submit" className="btn solid" disabled={isLoading}>
              {!isLoading ? "ادامه" : <Spinner />}
            </button>
            <NavLink to="/homepage">
              <button className=" back-to-store-btn">بازگشت به فروشگاه</button>
            </NavLink>
          </form>

          <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="title">ثبت نام</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                id="name"
                placeholder="نام "
                {...register("name")}
                required
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div className="input-field">
              <i className="fa-regular fa-user"></i>
              <input
                type="email"
                id="email"
                placeholder="ایمیل"
                {...register("email")}
                required
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                placeholder="رمز عبور"
                {...register("password")}
                required
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div
              className="input-field"
              error={errors?.passwordConfirm?.message}
            >
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="passwordConfirm"
                placeholder="تکرار رمز عبور"
                {...register("passwordConfirm")}
                required
              />
              {errors.passwordConfirm && (
                <p>{errors.passwordConfirm.message}</p>
              )}
            </div>
            <button type="submit" className="btn">
              ادامه
            </button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>هنوز ثبت نام نکرده اید ؟</h3>
            <p>
              <i className="fa-regular fa-heart"></i>
              به جمعیت میلیونی طرفداران عطر اورجینال بپیوندید
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={toggleSignUpMode}
            >
              ثبت نام
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>قبلا عضو شده اید ؟</h3>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={toggleSignUpMode}
            >
              ورود
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
