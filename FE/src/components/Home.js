import React, { useRef } from "react";
import { Image } from "./Image";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const Home = () => {
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const myComp = useRef(null);
  const navigate = useNavigate();

  const [cookies] = useCookies(["user"]);

  const addCart = (e) => {
    if (cookies.Id == null) {
      alert("You Are Not Logged In!");
    } else {
      const requestOptions = {
        userId: cookies.Id,
        bookId: e.target.id,
        quantity: 1,
      };
      axios
        .post("https://localhost:44381/api/Cart/Add", requestOptions)
        .then((response) => {
          setLoading(false);
          navigate("/Cart");
        })
        .catch((error) => {
          setBooks({});
          setLoading(false);
          setError("Something went wrong");
        });
    }
    // console.log(e.target.id)
  };

  useEffect(() => {
    axios
      .get("https://localhost:44381/api/Books/Top")
      .then((response) => {
        setLoading(false);
        setBooks(response.data.result);
        setError(null);
      })
      .catch((error) => {
        setBooks({});
        setLoading(false);
        setError("Something went wrong");
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="home">
        <h1>Top Books</h1>
        <hr />
        <div className="card_wrapper">
          {books.map((books) => (
            <div className="card" key={books.id}>
              <Image id={books.id}></Image>
              <h2>{books.title}</h2>
              <div className="button_wrapper">
                <button
                  id={books.id}
                  ref={myComp}
                  onClick={addCart}
                  className="cart"
                >
                  Add to Cart
                </button>
                <Link to="ProductDetails" state={{ id: books.id }} id="view">
                  View Details
                </Link>
                {/* {console.log(books.id)} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
