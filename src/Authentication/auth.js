//isLoggedIn
export const isLoggedIn = () => {
    let data = localStorage.getItem("data")
    if (data != null)
        return true
    else
        return false

}

//doLogin
//next() method is used as a callback function
export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data))
    next()
}

//doLogout
export const doLogout = (next) => {
    localStorage.removeItem("data")
    next()
}


//getCurrentDonor
export const getCurrentDonorDetails = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).donorDto
    }
    else {
        return false
    }
}