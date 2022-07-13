import axios from "axios";
import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Update = (props) => {
    if (props.status.username == null) {
        return (<label>Invalid Data</label>);
    } else {
        return (<label>Signed Up Successfully</label>)
    }

}

const SignUp = () => {
    const [submit, setSubmit] = useState({});
    const [inputs, setInputs] = useState({});
    const [update, setUpdate] = useState(null);
    const [cookies, setCookie] = useCookies(['user']);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.id;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // alert(inputs.desc);

        const requestOptions = {
            username: inputs.username,
            password: inputs.password,
            confirmPwd: inputs.confirmPWD,
            fullName: inputs.fname,
            phone: inputs.phone,
            email: inputs.email,
            address: inputs.address,
            isAdmin: false
        }
        axios.post('https://localhost:44381/api/Users/signup', requestOptions)
            .then(response => {
                setSubmit(response.data)
                setCookie('Token', response.data, { path: '/' })
                axios.get('https://localhost:44381/api/Users/'+inputs.email)
                .then(response => {
                    // console.log(response.data.result.id)
                    setCookie('Id', response.data.result.id, { path: '/' })
                    setCookie('Email', response.data.result.email, { path: '/' })
                    setCookie('IsAdmin', response.data.result.isAdmin, { path: '/' })
                    // window.location.reload()
                    navigate('/')
                })
            })
            .catch(error => {
                setUpdate(error)
                alert(error)
            });

    }

    return (
        <div className="signup-wrapper">


            <form className="formed" onSubmit={handleSubmit}>

                {/* */}
                <label>Username</label><br />
                <input type="text" id="username" onChange={handleChange}></input><br></br>
                <label >Password</label><br />
                <input type="password" id="password" onChange={handleChange}></input><br />
                <label >Confirm Password</label><br />
                <input type="password" id="confirmPWD" onChange={handleChange}></input><br />
                <label >Full Name</label><br />
                <input type="text" id="fname" onChange={handleChange}></input><br />
                <label >Phone Number</label><br />
                <input type="text" id="phone" onChange={handleChange}></input><br />
                <label >Email Id</label><br />
                <input type="text" id="email" onChange={handleChange}></input><br />
                <label >Address</label><br />
                <input type="text" id="address" onChange={handleChange}></input><br />

                <input type="submit" className="submit-button"></input><br />
                {update &&
                    <Update status={submit} />
                }

            </form>
        </div>
    );
}

export default SignUp;