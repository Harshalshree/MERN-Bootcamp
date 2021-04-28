import {API} from '../../backend'

//category calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`   
        },
        body: JSON.stringify(category)
    },)
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getAllCategories = () => {
    return fetch(`${API}/categories`,{
        method:"GET"
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => {
        console.log(err);
    })
}

//product calls
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method:"POST",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: product
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const getAllProducts = () => {
    return fetch(`${API}/products`,{
        method:"GET"
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => {
        console.log(err);
    })
}