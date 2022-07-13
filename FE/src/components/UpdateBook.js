import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Image } from './Image';

const UpdateBook = () => {
    // var s="hii"
    const myContainer = useRef(null)
    const [books, setBooks] = useState({});
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const [date, setDate] = useState(null);
    const { id } = location.state;
    const navigate = useNavigate();

    const selectFile = (e) => {
        // console.log(e.target.files[0])
        setFile(e.target.files[0])

    }


    const deleteBook = (e) => {
        e.preventDefault()
        let val = window.confirm('Are you sure?');
        if (val) {
            axios.delete('https://localhost:44381/api/Books/'+id)
            .then(res=>{
                navigate('/ViewList')
            }).catch(err=>{
                alert("Operation Failed!")
            })
        } else {
            
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let val = window.confirm('Are you sure?');
        const body={
        id: id,
        title: myContainer.current.Title.value,
        author: myContainer.current.Author.value,
        releaseDate: myContainer.current.ReleaseDate.value,
        price: myContainer.current.Price.value,
        description: myContainer.current.Description.value,
        quantity: myContainer.current.Quantity.value,
      }
        if (val) {
            axios.put('https://localhost:44381/api/Books',body)
            .then(res=>{
                navigate('/ViewList')
            }).catch(err=>{
                alert("Operation Failed!")
                console.log(err)
            })
        } else {
            console.log("Ahh Shit here we go again")
        }
    }


    const saveImage = (e) => {
        e.preventDefault()
        var body = new FormData()
        body.append('CoverImage', file, file.name)
        axios({
            method: "put",
            url: "https://localhost:44381/api/Books/image/" + id,
            data: body,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(response => {
                alert('Image Uploaded Successfully!')
                window.location.reload()
                console.log(response)
            })
            .catch(error => {

            })
    }

    useEffect(() => {


        axios
            .get("https://localhost:44381/api/Books/" + id)
            .then((response) => {
                setLoading(false);
                // console.log(response.data.releaseDate);
                setBooks(response.data);
                // console.log(response);
                // setDesc(books.description)
                setError(null);
            })
            .catch((error) => {
                setBooks({});
                setLoading(false);
                console.log(error)
                setError("Something went wrong");
            });

        // console.log(books)
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else
        return (
            <div className='form-wrapper'>

                <form className="formed" ref={myContainer} onSubmit={handleSubmit}>
                    <h1 style={{ textAlign: 'center' }}>Update Product</h1><br></br>
                    <center>
                        <hr ></hr>
                    </center>

                    <br></br>
                    <br></br>
                    {/* */}
                    { 
                        file == null &&
                        <Image id={books.id} ></Image>
                    }
                    <br></br>
                    <input type="file" id="CoverImage" accept="image/png, image/jpeg" onChange={selectFile}></input>
                    <br></br>
                    {
                        file !== null &&
                        <button onClick={saveImage}>Save Image</button>
                    }
                    <br></br>
                    <label>Title</label><br />
                    <input type="text" id="Title" defaultValue={books.title} /><br></br>
                    <label >Author</label><br />
                    <input type="text" id="Author" defaultValue={books.author}></input><br />
                    <label >Release Date</label><br />
                    <input type="date" id="ReleaseDate" defaultValue={books.releaseDate}></input><br />
                    <label >Price</label><br />
                    <input type="number" id="Price" defaultValue={books.price}></input><br />
                    <label >Description</label><br />
                    <textarea id="Description" rows="4" cols="50"  defaultValue={books.description} ></textarea><br />
                    <label >Quantity</label><br />
                    <input type="number" id="Quantity" defaultValue={books.quantity}></input><br />

                    <input type="submit" className="submit-button"></input><br></br>
                    <button className="submit-button" onClick={deleteBook}>Delete</button>
                    {/* <Update status={errors} /> */}


                </form>
            </div>
        );
}

export default UpdateBook;
