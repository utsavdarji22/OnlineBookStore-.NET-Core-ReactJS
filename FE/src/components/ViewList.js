import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export const ViewList = () => {
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const style = { color: "blue", textDecoration: "underline" };
  const addProd = (e) => {
    e.preventDefault();
    navigate("/AddProduct");
  };

  useEffect(() => {
    axios
      .get("https://localhost:44381/api/Books")
      .then((response) => {
        setLoading(false);
        setBooks(response.data);
        setError(null);
        console.log(books);
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
      <div className="cart-view">
        <button className="cart" onClick={addProd}>
          Add Product
        </button>
        <table>
          <tbody>
            {books.map((books) => (
              <tr>
                <td>
                  <Link to="/UpdateBook" state={{ id: books.id }} style={style}>
                    {books.id}
                  </Link>
                </td>
                <td>{books.title}</td>
                <td>{books.author}</td>
                <td>{books.price}</td>
                <td>{books.quantity}</td>
                {console.log(books)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};
