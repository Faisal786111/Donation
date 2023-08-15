import React, { useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Grid, Link, Paper, TextField } from '@mui/material'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import Base from '../../components/Base/Base';
import { doLogin, } from '../../Authentication/auth';
import { login } from '../../apiServices/Donor-services';
import {useNavigate} from "react-router-dom"

const Login = () => {

    const [loginDetail, setLoginDetail] = useState({
        username: '',
        password: ''
    })


    //error handling
    const [error,setError]  = useState({
        errors:{},
        isError:false
    })

    const navigate = useNavigate()

    const handleChange = (event, field) => {
        let actualValue = event.target.value
        setLoginDetail({
            ...loginDetail, [field]: actualValue
        })
    }

    //submit handler method
    const submitHandler = (event) => {
        event.preventDefault();

        //validation
        if (loginDetail.username.trim() === '' || loginDetail.password.trim() === '') {
            console.log("username and password is required!!")
        }

        //calling login api service to generate token
        login(loginDetail).then((jwtTokenData) => {
            console.log(jwtTokenData)
            doLogin(jwtTokenData, () => {
                console.log("Data is saved in the localstorage!!")
                //redirect to the donor page
                navigate("/donor/profile")
            })

            console.log("Login succesfully!!")

        }).catch((error) => {
            if (error?.response?.status === 400 && loginDetail.username.trim !== '' && loginDetail.password.trim !== '') {
                console.log("Invalid username and password!!")
            }
            else if (error?.response?.status === 404) {
                console.log(error.response.data.message)
            }
            else if (loginDetail.username !== '' && loginDetail.password !== '') {
                console.log("Something went wrong on server!!")
            }
            // console.log(error)
            // setError({
            //     errors:error,
            //     isError:true
            // })
        })


        console.log(loginDetail)
    }

    //delete details method 
    const deleteDetails = () => {
        setLoginDetail({
            username: '',
            password: ''
        })
    }

    return (
        <Base>
            <div className='background_image'>
                < Container maxWidth='sm'>
                    <Grid container spacing={2}
                        direction="column"
                        justifyContent="center"
                        style={{ minHeight: '100vh' }}>
                        <Paper elevation={2} sx={{ padding: 5 }}>
                            <Grid container direction="column" spacing={2}>
                                <h1 style={{ marginLeft: 188 }}>LOG IN</h1>
                                <Grid item>
                                    <TextField
                                        type='name'
                                        id="name"
                                        name="name"
                                        fullWidth
                                        label='Username'
                                        placeholder='Enter username'
                                        variant='outlined'
                                        value={loginDetail.username}
                                        onChange={(e) => handleChange(e, "username")}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                    
                                        id="password"
                                        name="password"
                                        type='password'
                                        fullWidth
                                        label='Password'
                                        placeholder='Enter Password'
                                        variant='outlined'
                                        value={loginDetail.password}
                                        onChange={(e) => handleChange(e, "password")}
                                    />

                                </Grid>
                                <Grid marginTop={3} container justifyContent="center">
                                    <Grid item >
                                        <Button variant="contained"  onClick={submitHandler}>Log In </Button>
                                    </Grid>
                                </Grid>
                                <Grid marginTop={3} container justifyContent="center">
                                    <Grid item >
                                        <p>Don't have an account?<NavLink to="/register"> Sign Up</NavLink></p>
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
    );
};

export default Login;
