import axios from "axios";
import React, { useRef } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
export const Login = () => {
  const myContainer = useRef(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    // console.log(myContainer.current.id.value)
    // console.log(myContainer.current.pass.value)
    // alert(document.getElementById("id").innerText)
    const body = {
      email: myContainer.current.id.value,
      password: myContainer.current.pass.value,
    };
    axios
      .post("https://localhost:44381/api/Users/login", body)
      .then((response) => {
        // console.log(response.data)
        setCookie("Token", response.data, { path: "/" });
        // console.log(cookies.Token)
        axios
          .get("https://localhost:44381/api/Users/" + body.email)
          .then((response) => {
            // console.log(response.data.result.id)
            setCookie("Id", response.data.result.id, { path: "/" });
            setCookie("Email", response.data.result.email, { path: "/" });
            setCookie("IsAdmin", response.data.result.isAdmin, { path: "/" });
            // window.location.reload()
            navigate("/");
          });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <>
      <div className="form-wrapper">
        <div className="form" onSubmit={handleChange}>
          <form ref={myContainer}>
            <div className="input-container">
              <label>Email id</label>
              <input
                className="uname"
                type="text"
                name="uname"
                id="id"
                required
              />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input
                className="pass"
                type="password"
                name="pass"
                id="pass"
                required
              />
            </div>
            <div className="button-container">
              <input type="submit" className="sub" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
