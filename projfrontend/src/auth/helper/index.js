import {API} from '../../backend'
//API = http://localhost:8000/api/

export const signUp = (user) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const signIn = (user) => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err)
    })
}


