import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Book = ({id}) => {
    const [books, setBooks] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('https://localhost:44381/api/Books/'+id)
            .then(response => {
                setLoading(false);
                setBooks(response.data);
                setError(null);
            })
            .catch(error => {
                setBooks({});
                setLoading(false);
                setError('Something went wrong')
            })
    }, []);



    return (
        <>
        <p>{books.title}</p>
        <div>{books.description}</div>
        <div>Rs. {books.price}</div>
        </>
    );
}

export default Book;
