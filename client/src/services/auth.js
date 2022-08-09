const axios = require('axios')

export async function getLogin(data){
    const payload = {...data}
    let res = {}

    await axios.post('http://localhost:3000/api/auth/login', payload)
        .then((response) => {
            res = response.data
        })
        .catch((error) => {
            res = error
        })
    return res
}

export async function getSignUp(data){
    const payload = {...data}
    let res = {}

    await axios.post('http://localhost:3000/api/auth/signup', payload)
        .then((response) => {
            res = response.data
        })
        .catch((error) => {
            res = error
        })
    return res
}
