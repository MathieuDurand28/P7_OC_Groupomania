const axios = require('axios')
const api = require('../apiSetting/config.json')

/**
 *
 * @param data
 * fonction permettant de confirmer l'authenticité d'un token et de recevoir les données
 * correspondantes.
 * @returns Array
 */
export async function checkingToken(data){
    const payload = {...data}
    let res = {}

    await axios.post(`${api.api_url}/auth/isLoggedUser`, payload)
        .then((response) => {
            res = response.data
        })
        .catch((error) => {
            res = error
        })
    return res
}
