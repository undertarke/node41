import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { checkForgetCodelAPI, checkForgetEmailAPI, loginAPI, loginFacebookAPI } from "../utils/fetchFromAPI";
import ReactFacebookLogin from "react-facebook-login";



const Forget = () => {

  const [step, setStep] = useState(0);
  // 0: nhập mail
  // 1: nhập code
  // 2: đổi pass

  return <div className="p-5 " style={{ minHeight: "100vh" }}>

    <div className=" d-flex justify-content-center">

      {step == 0 && <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>

        <div className="col-12">
          <button type="button" className="btn btn-primary" onClick={() => {

            let txtEmail = document.querySelector("#email").value;

            checkForgetEmailAPI({ email: txtEmail }).then(result => {
              setStep(1)
            }).catch(error => {
              alert(error.response.data.message)
            })


          }}>Next</button>

        </div>

      </form>}

      {step == 1 && <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">CODE</label>
          <input type="email" className="form-control" id="code" />
        </div>

        <div className="col-12">
          <button type="button" className="btn btn-primary" onClick={() => {

            let txtCode = document.querySelector("#code").value;

            checkForgetCodelAPI({ code: txtCode }).then(result => {
              
              setStep(2)

            }).catch(err => {
              alert(err.response.data.message)
            })

          }}>Next</button>

        </div>

      </form>}

      {step == 2 && <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">New Password</label>
          <input type="email" className="form-control" id="email" />
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
          }}>Next</button>

        </div>

      </form>}

    </div>
  </div>
};

export default Forget;
