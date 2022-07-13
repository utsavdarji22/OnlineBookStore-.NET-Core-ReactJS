import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Update = ({ errors }) => {
    if (errors != null) {
        return (<label>Invalid Data</label>);
    } else {
        return (<></>)
    }

}

const AddProduct = () => {
    const myContainer = useRef(null)
    const [file, setFile] = useState(null)
    const [errors, setError] = useState(null)
    const navigate = useNavigate()
    const selectFile = (e) => {
        // console.log(e.target.files[0])
        setFile(e.target.files[0])

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log( myContainer.current.ReleaseDate.value)
        var body = new FormData()
        body.append('Title', myContainer.current.Title.value)
        body.append('Author', myContainer.current.Author.value)
        body.append('ReleaseDate', myContainer.current.ReleaseDate.value)
        body.append('Price', myContainer.current.Price.value)
        body.append('Description', myContainer.current.Description.value)
        body.append('Quantity', myContainer.current.Quantity.value)
        body.append('CoverImage', file, file.name)
        axios({
            method: "post",
            url: "https://localhost:44381/api/Books",
            data: body,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(response => {
                alert('Product Added Successfully!')
                navigate('/ViewList')
            })
            .catch(error => {

            })
    }



    return (
        <div className='form-wrapper'>

            <form className="formed" ref={myContainer} onSubmit={handleSubmit}>
                <h1 style={{ textAlign: 'center' }}>Add Product</h1><br></br>
                <center><hr></hr></center>
                <br></br>
                {/* */}
                <label>Title</label><br />
                <input type="text" id="Title" ></input><br></br>
                <label >Author</label><br />
                <input type="text" id="Author" ></input><br />
                <label >Release Date</label><br />
                <input type="date" id="ReleaseDate" ></input><br />
                <label >Price</label><br />
                <input type="number" id="Price" ></input><br />
                <label >Description</label><br />
                <textarea id="Description" rows="4" cols="50"></textarea><br />
                <label >Quantity</label><br />
                <input type="number" id="Quantity" ></input><br />
                <label >CoverImage</label><br />
                <input type="file" id="CoverImage" accept="image/png, image/jpeg" onChange={selectFile}></input><br />

                <input type="submit" className="submit-button"></input><br />

                <Update status={errors} />


            </form>
        </div>
    );
}

export default AddProduct;
