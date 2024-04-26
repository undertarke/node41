import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { loginAPI, loginFacebookAPI } from "../utils/fetchFromAPI";
import ReactFacebookLogin from "react-facebook-login";



const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {

  }, []);
  const navigate = useNavigate();
  return <div className="p-5 " style={{ minHeight: "100vh" }}>
    <div className=" d-flex justify-content-center">
      <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>

        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Password</label>
          <input className="form-control" id="pass" />
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-primary" onClick={() => {

            let txtEmail = document.querySelector("#email").value;
            let txtPassword = document.querySelector("#pass").value;

            let model = {
              email: txtEmail,
              password: txtPassword
            }

            loginAPI(model).then(result => {

              alert(result.message)

              localStorage.setItem("LOGIN_USER", result.data)
              window.location.reload()

            }).catch(error => {

              alert(error.response.data.message)

            })
          }}>Login</button>
          <a className="text-primary" href="#" onClick={() => navigate("/forget")}> Forget password</a>
        </div>

        <ReactFacebookLogin
          appId="797783445614267"

          fields="name,email,picture"

          callback={(response) => {

            console.log(response)
            // call API login facebook
            let model = {
              userID: response.userID,
              email: response.email,
              name: response.name
            }
            loginFacebookAPI(model).then(result => {
              alert("Login thành công")

              localStorage.setItem("LOGIN_USER", result.data)
              window.location.reload()
            })

          }} />
      </form>
    </div>
  </div>
};

export default Login;
