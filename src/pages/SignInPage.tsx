import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../components/Input";
import Service from "../service";
import { validateBeforeLogin } from "../utils/validate.utils";
import { Response } from "../models/app";
import HelmetTitle from "../components/Helmet";
import ErrorMessage from "../components/ErrorMessage";
import styled from "styled-components";
const _ = require("lodash");

const LoginWrap = styled.div`
  height: 100vh;
  justify-content: center;
  display: flex;

  .form-wrap {
    display: grid;
  }

  body {
    width: 100vw;
    height: 100vh;
    background-color: #e0e0e0;
    font-size: 12px;
  }
  .inspiration {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    font-family: "Gill Sans", sans-serif;
    font-size: 12px;
    color: #969696;
  }
  .inspiration img {
    width: 60px;
  }
  .login-form {
    position: relative;
    box-shadow: 3px 3px 10px #eee;
    top: 50%;
    left: 50%;
    display: inline-block;
    width: 275px;
    height: 465px;
    padding-bottom: 26px;
    border-radius: 3px;
    transform: translate(-50%, -50%);
    overflow: hidden;
    background-image: linear-gradient(to top right, #f9a743, #f9db5f);
  }
  @media screen and (max-height: 500px) {
    .login-form {
      transition: transform 0.5s;
      transform: translate(-50%, -50%) scale(0.8);
    }
  }
  .login-form .ear {
    position: absolute;
    top: -110px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #243946;
  }
  .login-form .ear.ear--left {
    left: -135px;
  }
  .login-form .ear.ear--right {
    right: -135px;
  }
  .login-form .dog-face {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    height: 150px;
    margin: 80px auto 10px;
    --rotate-head: 0deg;
    transform: rotate(var(--rotate-head));
    transition: transform 0.2s;
    transform-origin: center 20px;
  }
  .login-form .eye {
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #243946;
  }
  .login-form .eye.eye--left {
    margin-right: 40px;
  }
  .login-form .eye.eye--right {
    margin-left: 40px;
  }
  .login-form .eye .glow {
    position: relative;
    top: 3px;
    right: -12px;
    width: 12px;
    height: 6px;
    border-radius: 50%;
    background-color: #fff;
    transform: rotate(38deg);
  }
  .login-form .nose {
    position: relative;
    top: 30px;
    transform: scale(1.1);
  }
  .login-form .error-message {
    text-align: center;
    margin-top: 10px;
  }
  .login-form .nose .glow {
    position: absolute;
    top: 3px;
    left: 32%;
    width: 15px;
    height: 8px;
    border-radius: 50%;
    background-color: #476375;
  }
  .login-form .mouth {
    position: relative;
    margin-top: 45px;
  }
  .login-form svg.smile {
    position: absolute;
    left: -28px;
    top: -19px;
    transform: scaleX(1.1);
    stroke: #243946;
  }
  .login-form .mouth-hole {
    position: absolute;
    top: 0;
    left: -50%;
    width: 60px;
    height: 15px;
    border-radius: 50%/100% 100% 0% 0;
    transform: rotate(180deg);
    background-color: #243946;
    z-index: -1;
  }
  .login-form .tongue {
    position: relative;
    top: 5px;
    width: 30px;
    height: 20px;
    background-color: #ffd7dd;
    transform-origin: top;
    transform: rotateX(60deg);
  }
  .login-form .tongue.breath {
    -webkit-animation: breath 0.3s infinite linear;
    animation: breath 0.3s infinite linear;
  }
  .login-form .tongue-top {
    position: absolute;
    bottom: -15px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: #ffd7dd;
  }
  .login-form .line {
    position: absolute;
    top: 0;
    width: 30px;
    height: 5px;
    background-color: #fcb7bf;
  }
  .login-form .median {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 25px;
    border-radius: 5px;
    background-color: #fcb7bf;
  }
  .login-form .hands {
    position: relative;
  }
  .login-form .hands .hand {
    position: absolute;
    top: -6px;
    display: flex;
    transition: transform 0.5s ease-in-out;
    z-index: 1;
  }
  .login-form .hands .hand--left {
    left: 50px;
  }
  .login-form .hands .hand--left.hide {
    transform: translate(2px, -155px) rotate(-160deg);
  }
  .login-form .hands .hand--left.peek {
    transform: translate(0px, -120px) rotate(-160deg);
  }
  .login-form .hands .hand--right {
    left: 170px;
  }
  .login-form .hands .hand--right.hide {
    transform: translate(-6px, -155px) rotate(160deg);
  }
  .login-form .hands .hand--right.peek {
    transform: translate(-4px, -120px) rotate(160deg);
  }
  .login-form .hands .finger {
    position: relative;
    z-index: 0;
  }
  .login-form .hands .finger .bone {
    width: 20px;
    height: 20px;
    border: 2px solid #243946;
    border-bottom: none;
    border-top: none;
    background-color: #fac555;
  }
  .login-form .hands .finger .nail {
    position: absolute;
    left: 0;
    top: 10px;
    width: 20px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #243946;
    background-color: #fac555;
    z-index: -1;
  }
  .login-form .hands .finger:nth-child(1),
  .login-form .hands .finger:nth-child(3) {
    left: 4px;
    z-index: 1;
  }
  .login-form .hands .finger:nth-child(1) .bone,
  .login-form .hands .finger:nth-child(3) .bone {
    height: 10px;
  }
  .login-form .hands .finger:nth-child(3) {
    left: -4px;
  }
  .login-form .hands .finger:nth-child(2) {
    top: -5px;
    z-index: 2;
  }
  .login-form .hands .finger:nth-child(1) .nail,
  .login-form .hands .finger:nth-child(3) .nail {
    top: 0px;
  }
  .login-form .login {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .login-form .login label {
    position: relative;
    padding: 0 20px;
  }
  .login-form .login label .fa {
    position: absolute;
    top: 40%;
    left: 35px;
    color: #bbb;
  }
  .login-form .login label .fa:before {
    position: relative;
    left: 1px;
  }
  .login-form .login input,
  .login-form .login .login-button {
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
  }
  .login-form .login input {
    padding: 0 20px;
    margin: 5px 0;
    box-shadow: none;
    outline: none;
    cursor: initial;
  }
  .login-form .login input::-moz-placeholder {
    color: #ccc;
  }
  .login-form .login input:-ms-input-placeholder {
    color: #ccc;
  }
  .login-form .login input::placeholder {
    color: #ccc;
  }
  .login-form .login .password-button {
    position: absolute;
    top: 9px;
    right: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 27px;
    border-radius: 30px;
    border: none;
    outline: none;
    background-color: #243946;
    color: #fff;
  }
  .login-form .login .password-button:active {
    transform: scale(0.95);
  }
  .login-form .login .login-button {
    width: calc(100% - 40px);
    margin: 20px 20px 0;
    outline: none;
    background-color: #243946;
    color: #fff;
    transition: transform 0.1s;
  }
  .login-form .login .login-button:active {
    transform: scale(0.95);
  }
  .login-form .social-buttons {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }
  .login-form .social-buttons .social {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    margin: 0 10px;
    border-radius: 50%;
    background-color: #243946;
    color: #fff;
    font-size: 18px;
  }
  .login-form .social-buttons .social:active {
    transform: scale(0.95);
  }
  .login-form .footer {
    text-align: center;
    margin-top: 15px;
  }
  @-webkit-keyframes breath {
    0%,
    100% {
      transform: rotateX(0deg);
    }
    50% {
      transform: rotateX(60deg);
    }
  }
  @keyframes breath {
    0%,
    100% {
      transform: rotateX(0deg);
    }
    50% {
      transform: rotateX(60deg);
    }
  }
`;

const SignInPage: React.FC<any> = () => {
  const [state, setState] = useState({
    userId: "",
    password: "",
    errorMessage: "",
  });

  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isError, message } = validateBeforeLogin(state.userId, state.password);

    if (isError) {
      setState({ ...state, errorMessage: message });
    } else {
      Service.signIn(state.userId, state.password)
        .then((response: Response) => {
          if (response.status === 200) {
            const { token } = response;

            if (token) {
              localStorage.setItem("token", token);
              history.push("/articles");
            } else {
              setState({ ...state, errorMessage: "Something went wrong, please try again." });
            }
          }
        })
        .catch((err) => {
          setState({ ...state, errorMessage: err.message });
        });
    }
  };

  const onChangeCommon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value, errorMessage: "" });
  };

  useEffect(() => {
    let usernameInput: any = document.querySelector(".username");
    let passwordInput: any = document.querySelector(".password");
    let showPasswordButton = document.querySelector(".password-button");
    let face: any = document.querySelector(".dog-face");

    passwordInput?.addEventListener("focus", () => {
      document.querySelectorAll(".hand").forEach((hand) => {
        hand.classList.add("hide");
      });
      document.querySelector(".tongue")?.classList.remove("breath");
    });

    passwordInput?.addEventListener("blur", () => {
      document.querySelectorAll(".hand").forEach((hand) => {
        hand.classList.remove("hide");
        hand.classList.remove("peek");
      });
      document.querySelector(".tongue")?.classList.add("breath");
    });

    usernameInput?.addEventListener("focus", () => {
      let length = Math.min(usernameInput?.value?.length - 16, 19);
      document.querySelectorAll(".hand").forEach((hand) => {
        hand.classList.remove("hide");
        hand.classList.remove("peek");
      });

      face?.style.setProperty("--rotate-head", `${-length}deg`);
    });

    usernameInput.addEventListener("blur", () => {
      face?.style.setProperty("--rotate-head", "0deg");
    });

    usernameInput.addEventListener(
      "input",
      _.throttle((e: any) => {
        let length = Math.min(e.target.value.length - 16, 19);

        face.style.setProperty("--rotate-head", `${-length}deg`);
      }, 100)
    );

    showPasswordButton?.addEventListener("click", () => {
      if (passwordInput?.type === "text") {
        passwordInput.type = "password";
        document.querySelectorAll(".hand").forEach((hand) => {
          hand.classList.remove("peek");
          hand.classList.add("hide");
        });
      } else {
        passwordInput.type = "text";
        document.querySelectorAll(".hand").forEach((hand) => {
          hand.classList.remove("hide");
          hand.classList.add("peek");
        });
      }
    });
  }, []);

  return (
    <LoginWrap>
      <div className="form-wrap">
        <HelmetTitle title="Login" />

        <div className="login-form">
          <div className="ear ear--left"></div>
          <div className="ear ear--right"></div>
          <div className="dog-face">
            <div className="eyes">
              <div className="eye eye--left">
                <div className="glow"></div>
              </div>
              <div className="eye eye--right">
                <div className="glow"></div>
              </div>
            </div>
            <div className="nose">
              <svg width="38.161" height="22.03">
                <path
                  d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z"
                  fill="#243946"
                ></path>
              </svg>
              <div className="glow"></div>
            </div>
            <div className="mouth">
              <svg className="smile" viewBox="-2 -2 84 23" width="84" height="23">
                <path
                  d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161"
                  fill="none"
                  strokeWidth={3}
                  strokeLinecap="square"
                  strokeMiterlimit={3}
                ></path>
              </svg>
              <div className="mouth-hole"></div>
              <div className="tongue breath">
                <div className="tongue-top"></div>
                <div className="line"></div>
                <div className="median"></div>
              </div>
            </div>
          </div>
          <div className="hands">
            <div className="hand hand--left">
              <div className="finger">
                <div className="bone"></div>
                <div className="nail"></div>
              </div>
              <div className="finger">
                <div className="bone"></div>
                <div className="nail"></div>
              </div>
              <div className="finger">
                <div className="bone"></div>
                <div className="nail"></div>
              </div>
            </div>
            <div className="hand hand--right">
              <div className="finger">
                <div className="bone"></div>
                <div className="nail"></div>
              </div>
              <div className="finger">
                <div className="bone"></div>
                <div className="nail"></div>
              </div>
              <div className="finger">
                <div className="bone"></div>
                <div className="nail"></div>
              </div>
            </div>
          </div>
          <form className="login" onSubmit={signIn}>
            <label>
              <Input
                className="username"
                type="text"
                id="user_id"
                name="userId"
                placeholder="Username"
                value={state.userId}
                onChange={onChangeCommon}
              />
            </label>
            <label>
              <Input
                className="password"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={state.password}
                onChange={onChangeCommon}
              />
            </label>
            <ErrorMessage message={state.errorMessage} className="error-message" />
            <button className="login-button">Login</button>
          </form>
        </div>
      </div>
    </LoginWrap>
  );
};

export default SignInPage;
