import React from "react";
import { Routes, Route } from "react-router-dom";
import { About } from "./components/About";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Login } from "./components/login";
import { Navbar } from "./components/Navbar";
import { ProductDetails } from "./components/ProductDetails";
import Protected from "./components/Protected";

import { Search } from "./components/Search";
import SignUp from "./components/Signup";
import UpdateBook from "./components/UpdateBook";
import { ViewList } from "./components/ViewList";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="Contact" element={<Contact></Contact>}></Route>
        <Route path="About" element={<About></About>}></Route>
        <Route path="ViewList" element={<ViewList></ViewList>}></Route>
        <Route
          path="ProductDetails"
          element={<ProductDetails></ProductDetails>}
        ></Route>
        <Route path="Cart" element={<Cart></Cart>}></Route>
        <Route
          path="Login"
          element={
            <Protected>
              {" "}
              <Login></Login>
            </Protected>
          }
        ></Route>
        <Route
          path="Signup"
          element={
            <Protected>
              {" "}
              <SignUp></SignUp>{" "}
            </Protected>
          }
        ></Route>
        <Route path="/AddProduct" element={<AddProduct></AddProduct>}></Route>
        <Route path="Search" element={<Search></Search>}></Route>
        <Route path="UpdateBook" element={<UpdateBook></UpdateBook>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
