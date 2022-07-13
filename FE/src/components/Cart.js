import axios from "axios";
import { Image } from "./Image";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Book from "./Book";
import { useCookies } from "react-cookie";

const Calc = ({ data }) => {
  // setTotal(0);

  const [total, setTotal] = useState(null);

  // console.log(data)

  useEffect(() => {
    let t = 0;
    data.forEach((e) => {
      axios
        .get("https://localhost:44381/api/Books/" + e.bookId)
        .then((response) => {
          t = t + response.data.price * e.quantity;
          // console.log(t)

          setTotal(t);
        });
    });
  }, [data]);

  // console.log(t)

  return (
    <>
      <h3>Total : Rs. {total}</h3>
    </>
  );
};

const Cart = () => {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const myContainer = useRef(null);
  const [cookies, setCookie] = useCookies(["user"]);

  // const [total, setTotal] = useState(null);

  const handleChange = (...value) => {
    // console.log(myContainer.current.innerHTML)
    if (value[3] === "-") {
      setLoading(true);
      // console.log(myContainer.current.parentNode.parentNode)
      const requestOptions = {
        id: value[2],
        userId: value[1],
        bookId: value[0],
        quantity: 1,
      };

      axios
        .put("https://localhost:44381/api/Cart/Update", requestOptions)
        .then((response) => {
          setLoading(false);
        })
        .catch((error) => {
          setBooks({});
          setLoading(false);
          setError("Something went wrong");
        });
    } else if (value[3] === "+") {
      // console.log("by")
      // console.log(value)
      setLoading(true);
      const requestOptions = {
        id: value[2],
        userId: value[1],
        bookId: value[0],
        quantity: 1,
      };
      axios
        .post("https://localhost:44381/api/Cart/Add", requestOptions)
        .then((response) => {
          setLoading(false);
        })
        .catch((error) => {
          setBooks({});
          setLoading(false);
          setError("Something went wrong");
        });
    } else {
      setLoading(true);
      axios
        .delete("https://localhost:44381/api/Cart/" + value[2])
        .then((response) => setLoading(false))
        .catch((error) => {
          setBooks({});
          setLoading(false);
          setError("Something went wrong");
        });
    }
  };

  useEffect(() => {
    axios
      .get("https://localhost:44381/api/Cart/" + cookies.Id)
      .then((response) => {
        setLoading(false);
        setBooks(response.data);
        setError(null);
        // console.log("hi")
      })
      .catch((error) => {
        setBooks({});
        setLoading(false);
        setError("Something went wrong");
      });

    // calculate()
  }, [loading]);

  if (error) {
    return <div>Error: {error}</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="cart-view">
        <h1>Cart</h1>
        <hr></hr>
        <div className="table-view">
          <table>
            <thead>
              <tr>
                <th>Book Image</th>
                <th>Book</th>
                <th>Quantity</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((books) => (
                <tr id={books.id} style={{ width: "170px" }}>
                  <td>
                    <Image id={books.bookId}></Image>
                  </td>
                  <td>
                    <Book id={books.bookId} />
                  </td>
                  <td>{books.quantity}</td>
                  <td>
                    {books.quantity > 1 ? (
                      <button
                        ref={myContainer}
                        onClick={() =>
                          handleChange(
                            books.bookId,
                            books.userId,
                            books.id,
                            "-"
                          )
                        }
                        className="subtract"
                      >
                        -
                      </button>
                    ) : (
                      <button
                        ref={myContainer}
                        onClick={() =>
                          handleChange(
                            books.bookId,
                            books.userId,
                            books.id,
                            "Delete"
                          )
                        }
                        className="subtract"
                      >
                        Delete
                      </button>
                    )}
                    {/* <Remove id={books.quantity} data={books.bookId} user={books.userId} /> */}
                  </td>
                  <td>
                    <button
                      ref={myContainer}
                      onClick={() =>
                        handleChange(books.bookId, books.userId, books.id, "+")
                      }
                      className="added"
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-wrapper">
            {/* <h3 >Total : {total}</h3> */}
            {loading ? <></> : <Calc data={books} />}
            <br />
            <button
              className="purchase"
              onClick={() => {
                alert("Book Purchased");
              }}
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default Cart;
