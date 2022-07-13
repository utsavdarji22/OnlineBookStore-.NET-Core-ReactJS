import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, NavLink, useNavigate } from "react-router-dom";
// const isAdmin = true;
const UserLogged = ({ name }) => {
  if (name === "true") {
    return <NavLink to="ViewList">ViewList</NavLink>;
  } else {
    return <></>;
  }
};
export const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSearch = (e) => {
    setMessage(e.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    removeCookie("Token", { path: "/" });
    removeCookie("Id", { path: "/" });
    removeCookie("Email", { path: "/" });
    removeCookie("IsAdmin", { path: "/" });
    // window.location.reload()
    navigate("/");
    // console.log(typeof(cookies.IsAdmin))
  };
  return (
    <>
      <header className="navbar">
        <nav>
          <ul>
            <h1 id="logo">Bookers</h1>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="About">About</NavLink>
            </li>
            <li>
              <NavLink to="Contact">Contact</NavLink>
            </li>
            <li>
              <input
                className="field"
                type="text"
                placeholder="Search an item"
                onChange={handleSearch}
              ></input>
              <Link
                to="Search"
                state={{ mess: message }}
                id="search"
                className="btn"
              >
                Search
              </Link>
            </li>
          </ul>
          <div className="wrapper">
            {cookies.Id ? (
              <></>
            ) : (
              <>
                <button className="login">
                  <NavLink to="Login">Log In</NavLink>
                </button>
                <button className="signup">
                  <NavLink to="Signup">Sign Up</NavLink>
                </button>
              </>
            )}

            {cookies.Id && <NavLink to="Cart">Cart</NavLink>}
            <UserLogged name={cookies.IsAdmin}></UserLogged>

            {cookies.Id && (
              <button className="login" onClick={handleChange}>
                Log Out
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};
