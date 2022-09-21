const axios = require('axios')

export async function getMessages(payload){
    let res = {}

    await axios.post('http://localhost:3000/api/msg/getMessages', payload)
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

export async function deleteMessage(payload){
    await axios.post('http://localhost:3000/api/msg/deleteMessage', payload)
}

export async function likeManager(payload){
    await axios.post('http://localhost:3000/api/msg/likeMessage', payload)
}


