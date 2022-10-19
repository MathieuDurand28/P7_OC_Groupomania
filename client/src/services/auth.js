const axios = require('axios')
const api = require('../apiSetting/config.json')


/**
 *
 * @param data
 * fonction permettant de s'authentifier via un appel serveur
 * @returns array
 */
export async function GetLogin(data){
    const payload = {...data}
    let res = {}

    await axios.post(`${api.api_url}/auth/login`, payload)
        .then((response) => {
            res = response.data
        })
        .catch((error) => {
            res = error
        })
    return res
}

/**
 *
 * @param data
 * fonction permettant de créer un compte via un appel serveur
 * @returns array
 */
export async function GetSignUp(data){
    const payload = {...data}
    let res = {}

    await axios.post(`${api.api_url}/auth/signup`, payload)
        .then((response) => {
            res = response.data
        })
        .catch((error) => {
            res = error
        })
    return res
}

/**
 *
 * @param data
 * fonction permettant de savoir si l'utilisateur en cours est un administrateur via un appel serveur
 * @returns array
 */
export async function isAdmin(data){
    const payload = {...data}
    let res = {}

    await axios.post(`${api.api_url}/auth/isAdmin`, payload)
        .then((response) => {
            res = response.data
        })
        .catch((error) => {
            res = error
        })
    return res
}
