
import React from 'react'

import { useState, useEffect } from 'react'
export const Image = ({ id }) => {

  const [books, setBooks] = useState({});
  // const [loading,setLoading] = useState(true);
  // const [error,setError] = useState('');


  const fetchImage = async () => {
    const res = await fetch('https://localhost:44381/api/Books/image/' + id);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setBooks(imageObjectURL);
  };
  useEffect(() => {


    fetchImage();
  }, []);
  return (
    <>

      <img src={books}></img>
    </>
  )
}
