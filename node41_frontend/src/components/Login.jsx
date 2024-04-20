import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { loginAPI } from "../utils/fetchFromAPI";



const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {

  }, []);

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

              alert(error.message)

            })
          }}>Login</button>

        </div>
      </form>
    </div>
  </div>
};

export default Login;
