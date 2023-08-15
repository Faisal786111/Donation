import React from 'react'
import './Signup.css';
import { NavLink } from 'react-router-dom';
import Base from '../../components/Base/Base';
import { Button, Container, Grid, Paper, TextField } from '@mui/material'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useState, useEffect } from 'react'
import { signUp } from '../../apiServices/Donor-services';
import {useNavigate} from "react-router-dom"

const Signup = () => {

    //navigation 
    const navigate = useNavigate()

    //useState doesn't support callback function
    const [donor, setDonor] = useState({
        name: '',
        email: '',
        password: '',
        contactNo: '',
        address: ''
    })

    const [error, setError] = useState({
        errors: {},
        isError: false
    })

    useEffect(() => {
        console.log(donor)
    }, [donor])

    //handle change method
    const handleChange = (event, property) => {
        //dynamicly setting the value using [property]
        setDonor({ ...donor, [property]: event.target.value })
    }

    //reset method
    const deleteData = () => {
        setDonor({
            name: '',
            email: '',
            password: '',
            contactNo: '',
            address: ''
        })
    }

    //sumbit handler method
    const submitHandler = (event) => {
        console.log(donor)

        //api calling for sending data 
        signUp(donor).then(
            (response) => {
                console.log(response)
                console.log("success log!!")
                navigate("/donor/profile")
                // setDonor({
                //     name: '',
                //     email: '',
                //     password: '',
                //     contactNo: '',
                //     address: ''
                // })
            }
        ).catch((error) => {
            console.log(error)
            console.log("Error log!!")
            // toast.error("User is not registered successfully!!", { position: "bottom-center" })
            setError({
                errors: error,
                isError: true
            })
        })

        //using this function page will not reload
        event.preventDefault()
    }
    
    
    return (
        <Base>
            <div className='background_image'>
                < Container maxWidth='sm'>
                    <Grid container spacing={2}
                        direction="column"
                        justifyContent="center"
                        style={{ minHeight: '100vh' }}>
                        <Paper elevation={2} sx={{ padding: 5 }} >
                            <Grid container direction="column" spacing={2} >
                                <h1 className='text-center'>SIGN UP</h1>
                                {/* Name field  */}
                                <Grid item>
                                    <TextField
                                        error={error.errors?.response?.data?.name ? true : false}
                                        helperText={error.errors?.response?.data?.name}
                                        id="name"
                                        name="name"
                                        type='name'
                                        fullWidth
                                        label='Username'
                                        placeholder='Enter Username'
                                        variant='outlined'
                                        onChange={(e) => handleChange(e, "name")}
                                        value={donor.name}
                                        />
                                </Grid>
                                {/* Email field  */}
                                <Grid item>
                                    <TextField
                                        error={error.errors?.response?.data?.email ? true : false}
                                        helperText={error.errors?.response?.data?.email}
                                        id="email"
                                        name="email"
                                        type='email'
                                        fullWidth
                                        label='Email'
                                        placeholder='Enter email'
                                        variant='outlined'
                                        onChange={(e) => handleChange(e, "email")}
                                        value={donor.email}
                                        />
                                </Grid>
                                {/* Password field  */}
                                <Grid item>
                                    <TextField
                                        error={error.errors?.response?.data?.password ? true : false}
                                        helperText={error.errors?.response?.data?.password}
                                        id="password"
                                        name="password"
                                        type='password'
                                        fullWidth
                                        label='Password'
                                        placeholder='Enter Password'
                                        variant='outlined'
                                        onChange={(e) => handleChange(e, "password")}
                                        value={donor.password}
                                        />

                                </Grid>
                                {/* contactNo field  */}
                                <Grid item>
                                    <TextField
                                        error={error.errors?.response?.data?.contactNo ? true : false}
                                        helperText={error.errors?.response?.data?.contactNo}
                                        id="contactNo"
                                        name="contactNo"
                                        type='text'
                                        fullWidth
                                        label='contactNo'
                                        placeholder='Enter Contact Number'
                                        variant='outlined'
                                        onChange={(e) => handleChange(e, "contactNo")}
                                        value={donor.contactNo}
                                        />
                                </Grid>
                                {/* Address field  */}
                                <Grid item>
                                    <TextField
                                        error={error.errors?.response?.data?.address ? true : false}
                                        helperText={error.errors?.response?.data?.address}
                                        id="address"
                                        name="address"
                                        fullWidth
                                        // id="outlined-textarea"
                                        label="address"
                                        placeholder="Enter Address"
                                        multiline
                                        onChange={(e) => handleChange(e, "address")}
                                        value={donor.address}
                                        />
                                </Grid>
                                <Grid marginTop={3} container justifyContent="center">
                                    <Grid item >
                                        <Button variant="contained" type='Submit' onClick={submitHandler}>Sign Up</Button>
                                    </Grid>
                                </Grid>
                                <Grid marginTop={3} container justifyContent="center">
                                    <Grid item >
                                        <p>Already have an account?<NavLink to="/login" style={{ marginLeft: 5 }}>Log in</NavLink></p>
                                    </Grid>
                                </Grid>
                                <Grid style={{ textAlign: 'center' }}>
                                    <hr style={{ width: '45%', display: 'inline-block', margin: '0 5px' }} />
                                    <span style={{ display: 'inline-block' }}>or</span>
                                    <hr style={{ width: '45%', display: 'inline-block', margin: '0 5px' }} />
                                </Grid>
                                <Grid container justifyContent="center">

                                    <GoogleOAuthProvider clientId="463926277819-0gij5e1d4hupskhg32fcrvgi6qiu76v5.apps.googleusercontent.com">
                                        <GoogleLogin
                                            onSuccess={credentialResponse => {
                                                var decoded = jwt_decode(credentialResponse.credential);
                                                console.log(decoded);
                                            }}
                                            onError={() => {
                                                console.log('Login Failed');
                                            }}
                                            />
                                    </GoogleOAuthProvider>

                                </Grid>
                            </Grid>
                        </Paper>

                    </Grid>
                </Container>
            </div>
        </Base>
    )
}


export default Signup;
