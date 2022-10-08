const axios = require('axios')

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

    await axios.post('http://localhost:3000/api/auth/isLoggedUser', payload)
        .then((response) => {
            res = response.data
        })
        .catch((error) => {
            res = error
        })
    return res
}
