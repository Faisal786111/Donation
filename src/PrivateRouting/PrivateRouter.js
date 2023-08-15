import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {isLoggedIn} from "../Authentication/auth"

const PrivateRouter = ()=>{
 
    return isLoggedIn()  ? <Outlet/> : <Navigate to ="/login"/>
}

export default PrivateRouter;