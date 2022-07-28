const axios = require('axios')

export async function authentification(data){
    const payload = {...data}
    let res = {}

    await axios.post('http://localhost:4000/api/auth', payload)
        .then((response) => {
            res = response.data
        })
        .catch((error) => {
            res = error
        })
    return res
}
