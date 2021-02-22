import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getItemLocalStorage } from "../utils/localStorage.utils";

const FooterWrap = styled.div`
  width: 100%;
  background: #00121b;
  display: block;

  .inner-footer {
    width: 95%;
    margin: auto;
    padding: 30px 10px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: center;
  }

  .footer-items {
    width: 25%;
    padding: 10px 20px;
    box-sizing: border-box;
    color: #fff;
  }

  .footer-items p {
    font-size: 16px;
    text-align: justify;
    line-height: 25px;
    color: #fff;
  }

  .footer-items h1 {
    color: #fff;
  }

  .border1 {
    height: 3px;
    width: 40px;
    background: #ff9800;
    color: #ff9800;
    background-color: #ff9800;
    border: 0px;
  }

  ul {
    list-style: none;
    color: #fff;
    font-size: 15px;
    letter-spacing: 0.5px;
  }

  ul a {
    text-decoration: none;
    outline: none;
    color: #fff;
    transition: 0.3s;
  }

  ul a:hover {
    color: #ff9800;
  }

  ul li {
    margin: 10px 0;
    height: 25px;
  }

  li i {
    margin-right: 20px;
  }

  .social-media {
    width: 100%;
    color: #fff;
    text-align: center;
    font-size: 20px;
  }

  .social-media a {
    text-decoration: none;
  }

  .social-media i {
    height: 25px;
    width: 25px;
    margin: 20px 10px;
    padding: 4px;
    color: #fff;
    transition: 0.5s;
  }

  .social-media i:hover {
    transform: scale(1.5);
  }

  .footer-bottom {
    padding: 10px;
    background: #00121b;
    color: #fff;
    font-size: 12px;
    text-align: center;
  }

  @media screen and (max-width: 1275px) {
    .footer-items {
      width: 50%;
    }
  }

  @media screen and (max-width: 660px) {
    .footer-items {
      width: 100%;
    }
  }
`;

const Footer = () => {
  const location = useLocation();
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(getItemLocalStorage("token", ""));
  }, [location]);

  if (!token) return null;
  else
    return (
      <FooterWrap>
        <div className="inner-footer">
          <div className="footer-items">
            <h1>FreeC Asia</h1>
            <p>Tìm kiếm công việc mơ ước của bạn.</p>
          </div>

          <div className="footer-items">
            <h3>Quick Links</h3>
            <div className="border1"></div>
            <ul>
              <a href="#">
                <li>Home</li>
              </a>
              <a href="#">
                <li>Search</li>
              </a>
              <a href="#">
                <li>Contact</li>
              </a>
              <a href="#">
                <li>About</li>
              </a>
            </ul>
          </div>

          <div className="footer-items">
            <h3>Recipes</h3>
            <div className="border1"></div>
            <ul>
              <a href="#">
                <li>Vietnamese</li>
              </a>
              <a href="#">
                <li>Japanese</li>
              </a>
              <a href="#">
                <li>Mexican</li>
              </a>
              <a href="#">
                <li>Italian</li>
              </a>
            </ul>
          </div>

          <div className="footer-items">
            <h3>Contact us</h3>
            <div className="border1"></div>
            <ul>
              <li>
                <i className="fa fa-map-marker" aria-hidden="true"></i>XYZ, abc
              </li>
              <li>
                <i className="fa fa-phone" aria-hidden="true"></i>123456789
              </li>
              <li>
                <i className="fa fa-envelope" aria-hidden="true"></i>xyz@gmail.com
              </li>
            </ul>

            <div className="social-media">
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-google-plus-square"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">Copyright &copy; 2021.</div>
      </FooterWrap>
    );
};

export default Footer;
