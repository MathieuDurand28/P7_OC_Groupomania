const axios = require('axios')


export async function GetLogin(data){
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

export async function GetSignUp(data){
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

export async function isAdmin(data){
    const payload = {...data}
    let res = {}

    await axios.post('http://localhost:3000/api/auth/isAdmin', payload)
        .then((response) => {
            res = response.data
        })
        .catch((error) => {
            res = error
        })
    return res
}

export async function hasAuthentificated(){

    let res = {}
    await axios.get('http://localhost:3000/api/auth/isConnected')
        .then((response) => {
            res = response.data.authentified
        })
        .catch((error) => {
            res = error
        })
    return res
}
