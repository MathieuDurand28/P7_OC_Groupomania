const axios = require('axios')

export async function getMessages(){
    let res = {}

    await axios.get('http://localhost:3000/api/msg/getMessages')
        .then((response) => {
            res = response.data
        })
        .catch((error) => {
            res = error
        })
    return res
}

export async function postMessages(payload){
    await axios.post('http://localhost:3000/api/msg/postMessages', payload)
}
