// import { Image } from './Image';
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "./Image";
import { useCookies } from "react-cookie";
export const ProductDetails = () => {
  const myComp = useRef(null);
  const location = useLocation();
  const { id } = location.state;
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);
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
      .get("https://localhost:44381/api/Books/" + id)
      .then((response) => {
        setLoading(false);
        console.log(response.data.releaseDate);
        setBooks(response.data);
        console.log(date);
        setError(null);
      })
      .catch((error) => {
        setBooks({});
        setLoading(false);
        setError("Something went wrong");
      });
  }, [id, date]);

  if (loading) {
    <div>Loading</div>;
  } else if (error) {
    <div>Error:{error}</div>;
  } else {
    return (
      <>
        <div className="details">
          <h1> Book Details</h1>
          <hr />
          <div className="detail-wrapper">
            <div className="image-body">
              <Image className="image-container" id={books.id}></Image>
              <h1>{books.title}</h1>
            </div>
            <div className="detail-content">
              <h1> Price: Rs {books.price}</h1>
              <h1>A book By: {books.author}</h1>
              <p>{books.description}</p>
              <p>Released on : {books.releaseDate}</p>
              <button
                id={books.id}
                ref={myComp}
                onClick={addCart}
                className="cart"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};
