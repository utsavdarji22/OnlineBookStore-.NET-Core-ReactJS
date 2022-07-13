import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "./Image";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
export const Search = () => {
  const location = useLocation();
  const { mess } = location.state;
  const navigate = useNavigate();
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cookies] = useCookies(["user"]);
  const myComp = useRef(null);
  const [type, setType] = useState(null);

  const addCart = () => {
    if (cookies.Id == null) {
      alert("You Are Not Logged In!");
    } else {
      const requestOptions = {
        userId: cookies.Id,
        bookId: myComp.current.id,
        quantity: 1,
      };
      axios
        .post("https://localhost:44381/api/Cart/Add", requestOptions)
        .then((response) => {
          setLoading(false);
          navigate("Cart");
        })
        .catch((error) => {
          setBooks({});
          setLoading(false);
          setError("Something went wrong");
        });
    }
    // console.log(cookies.Id)
  };

  useEffect(() => {
    console.log(mess);
    if (mess === "") {
      navigate("/");
    }
    axios
      .get("https://localhost:44381/api/Books/search?name=" + mess)
      .then((response) => {
        setLoading(false);
        setBooks(response.data.result);

        setType(typeof books);
        console.log(books.id);
        setError(null);
      })
      .catch((error) => {
        setBooks({});
        setLoading(false);
        setError("Something went wrong");
      });
  }, [mess, navigate]);
  if (error) {
    return <div>Error: {error}</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="home">
        <h1>Searched Books</h1>
        <hr />

        <div className="card_wrapper">
          {books.map((books) => (
            <div className="card" key={books.id}>
              <Image id={books.id}></Image>
              <h1>{books.title}</h1>
              <div className="button_wrapper">
                <button
                  className="cart"
                  id={books.id}
                  ref={myComp}
                  onClick={addCart}
                >
                  Add to Cart
                </button>
                <Link to="ProductDetails" state={{ id: books.id }} id="view">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
