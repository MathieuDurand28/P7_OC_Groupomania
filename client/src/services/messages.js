const axios = require('axios')

/**
 * 
 * @param payload 
 * fonction faisant un appel au serveur pour récupérer tous les messages
 * contenus dans la base de données.
 * @returns Array
 */
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

/**
 * 
 * @param payload 
 * fonction permettant d'envoyer un message via un appel serveur
 */
export async function postMessages(payload){
    await axios.post('http://localhost:3000/api/msg/postMessages', payload)
}

/**
 * 
 * @param payload 
 * fonction permettant de mettre à jour un message via un appel serveur
 */
export async function updateMessage(payload){
    await axios.put('http://localhost:3000/api/msg/updateMessage', payload)
}

/**
 * 
 * @param payload 
 * fonction permettant d'effacer un message via un appel serveur
 */
export async function deleteMessage(payload){
    await axios.post('http://localhost:3000/api/msg/deleteMessage', payload)
}

/**
 * 
 * @param payload 
 * fonction permettant de liker/disliker un message via un appel serveur
 */
export async function likeManager(payload){
    await axios.post('http://localhost:3000/api/msg/likeMessage', payload)
}

/**
 * 
 * @param payload 
 * fonction permettant de supprimer un message via un appel serveur
 */
export async function suppresImage(payload){
    await axios.post('http://localhost:3000/api/msg/suppressImage', payload)
}

/**
 * 
 * @param payload 
 * fonction permettant de savoir si un message est déjà aimé par l'utilisateur via un appel serveur
 */
export async function alreadyLikeSearch(payload){
    let res = {}
    await axios.post('http://localhost:3000/api/msg/alreadyLike', payload)
        .then((response) => {
            res = response.data.like
        })
        .catch((error) => {
            res = error
        })
    return res
}


