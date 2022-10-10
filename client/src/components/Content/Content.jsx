import './Content.scss';
import {
    postMessages,
    getMessages,
    deleteMessage,
    likeManager,
    updateMessage,
    suppresImage
} from "../../services/messages"
import Modal from '@material-ui/core/Modal';
import {useForm} from "react-hook-form"
import {useSelector} from "react-redux"
import nameSplit from "../../services/nameSplit"
import {useEffect, useState} from "react"
import {Box, Button, Typography} from "@material-ui/core";

/**
 *
 * Composant contenant tout le contenu du site.
 */
export default function Content() {
    /**
     * déclarations des States nécessaires
     */
    const user_logged                               = useSelector((state) => state.user)
    const {register, handleSubmit}                  = useForm()
    const [messages, setMessages]                   = useState([])
    const [modif, setModif]                         = useState({})
    const [open, setOpen]                           = useState(false)
    const [file, setFile]                           = useState("")
    const [newFile, setNewFile]                     = useState("")
    const [originalFileName, setOriginalFileName]   = useState("")
    const [newFileName, setNewFileName]             = useState("")
    const [suppresImageModal, setsuppresImageModal] = useState({suppress: false, name: ""})


    /**
     * fonction permettant de récupérer les messages depuis le serveur
     */
    const getMsg = () => {
        const text_area = document.getElementById("text-area")
        getMessages({token: user_logged.token}).then((res) => {setMessages(res.all_posts.reverse())})
    }

    /**
     *
     * fonction surveillant le changement de fichier dans la page principale
     */
    function handleChange(event) {
        const input_image = event.target.files
        setOriginalFileName(input_image[0].name)
        setFile(input_image)
    }

    /**
     *
     * fonction surveillant le changement de fichier dans la modal de modification
     */
    function handleChangeModal(event) {
        const input_image = event.target.files
        const image_modal = document.getElementById('image-modal')
        image_modal.src = (URL.createObjectURL(event.target.files[0]))
        setNewFileName(input_image[0].name)
        setNewFile(input_image)
    }

    /**
     *
     * fonction appelée lors la soumission du formulaire d'envoi de message.
     *
     */
    const postMsg = async (data) => {
        const text_area = document.getElementById("text-area")
        const formData = new FormData()
        let newImageName = ""

        //contrôle si le message n'est pas vide ou si un fichier est uploadé
        if (text_area.value.length <= 0 && file.length <= 0 ){
            alert('Votre message est vide.')
        }
        else {
           //si un fichier est uploadé, envoi du fichier au serveur
           if (file.length > 0){
            formData.append('myFile', file[0])
            await fetch('http://localhost:3000/api/msg/postImage', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then((result) => {
                    newImageName = result.full_name
                    setOriginalFileName("")
                    setFile("")
                })
                .catch(error => {
                    console.error(error)
                })
            }

            //envoi du message au serveur
            await postMessages(
                {
                    message: text_area.value.length > 0 ? text_area.value : "",
                    author: nameSplit(user_logged.email),
                    email: user_logged.email,
                    userId: user_logged.user_id,
                    token: user_logged.token,
                    fileName: newImageName
                },
            )
            text_area.value = ""
        }
        getMsg()
    }

    /**
     *
     * @param datas
     * Fonction permettant de supprimer / modifier un message depuis la modal de modification
     */
    const postModal = async (datas) => {
        let imageName = ""

        if (suppresImageModal.suppress){
            await suppresImage({
                msgId: modif.id,
                image: suppresImageModal.name,
                token: user_logged.token
            })
        }

        if (newFile.length > 0){
            const newformData = new FormData()
            newformData.append('myFile', file[0])
            await fetch('http://localhost:3000/api/msg/postImage', {
                method: 'POST',
                body: newformData,
            })
                .then(response => response.json())
                .then((result) => {
                    imageName = result.full_name
                    setNewFileName("")
                })
                .catch(error => {
                    console.error(error)
                })
        }
        if (datas.messageModal.length > 0){
            const modal_text = document.getElementById("text_modal")

            await updateMessage(
                {
                    message: datas.messageModal,
                    author: nameSplit(user_logged.email),
                    email: user_logged.email,
                    userId: user_logged.user_id,
                    token: user_logged.token,
                    id: modif.id,
                    fileName: imageName
                }
            )
        }
        await handleClose()
        getMsg()
    }

    /**
     *
     * @param id
     * fonction permettant de supprimer un message
     */
    const delete_message = async (id) => {
        await deleteMessage({id: id,token: user_logged.token})
        getMsg()
    }

    /**
     *
     * @param id
     * fonction permettant de modifier un message
     */
    const modif_message = async (id) => {
        setModif(id)
    }

    /**
     *
     * @param id
     * fonction permettant de liker un message
     */
    const likeMessage = async (msg_id,user_id) => {
        await likeManager({userId:user_id,msgId:msg_id,token: user_logged.token})
        getMsg()
    }

    /**
     *
     * @param id
     * fonction permettant d'afficher la modal de modification
     */
    const handleOpen = (id) => {
        messages.map((msg) => {
            if (msg.id === id){
                setModif({
                    author: msg.author,
                    message: msg.message,
                    userId: msg.userId,
                    id: msg.id,
                    imageSrc: msg.imageSrc
                })
            }
        })
        setOpen(true);
    }
    /**
     *
     * @param id
     * fonction permettant de fermer la modal de modification
     */
    const handleClose = async () => {
        setsuppresImageModal({suppress: false, name: ""})
        setNewFileName("")
        setOpen(false);
    };

    /**
     *
     * @param users
     * Fonction permettant de savoir si un utilisateur à déj& aimé un message.
     */
    const like = (users) => {
        const arrayOfUsers = users.split(";")
        let find = false
        if (arrayOfUsers.length > 0){
            arrayOfUsers.map((users) => {
                if (users === user_logged.user_id.toString()){
                    find = true
                }
            })
        }
        return find
    }

    /**
     *
     * @param e
     * Fonction permettant de supprimer une image.
     */
    const modal_image_suppress = (e) => {
        e.preventDefault()
        setsuppresImageModal({suppress: true, name:modif.imageSrc})
        setModif({...modif, imageSrc: ""})
    }

    const handleTextModalChange = (event) => {
        setModif({...modif, message: event.target.value})
    }


    useEffect(() => {
        getMsg()
    }, [])

    return (
        <div className="content">
            <aside className="aside"></aside>
            <main className="container">
                <form className="posts_container" method="post" encType="multipart/form-data" onSubmit={handleSubmit(postMsg)} >
                    <div className="post_message">
                        <textarea id="text-area"></textarea>
                    </div>
                    <div className="image-post">
                        <label htmlFor="image_post">Ajouter une image</label>
                        <input type="file" id="image_post" name="image_post" {...register("imageFile")} onChange={handleChange} />
                        <span id="file-name">{originalFileName}</span>
                    </div>
                    <button type="submit" className="new_post">
                        Poster un message
                    </button>
                </form>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="modal">
                        <form onSubmit={handleSubmit(postModal)}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Modification du message de {modif.author}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <span className="modal_content image-post-modal">
                                    {modif.imageSrc && <img src={"http://localhost:3000/images/"+ modif.imageSrc } alt="Photo accompagnant le message" className="attachement-modal" id="image-modal" />}
                                    <label htmlFor="image_post_modal">{modif.imageSrc ? "Changer image" : "Ajouter image"}</label>
                                    <input type="file" id="image_post_modal" name="image_post_modal" {...register("imageFileModal")} onChange={handleChangeModal} />
                                    <span id="file-name">{newFileName}</span>
                                    {modif.imageSrc  &&
                                        <span className="modal_content_footer">
                                            <button className="modal_btn" onClick={(e) => modal_image_suppress(e)}>Supprimer l'image</button>
                                        </span>
                                    }
                                    <label>LA VALEUR NE CHANGE PAS DANS LE TEXTAREA</label>
                                    <textarea className="textarea" name="description" id="text_modal" {...register("messageModal")} value={modif.message} onChange={handleTextModalChange} />
                                    <label htmlFor="input-test">LA VALEUR CHANGE BIEN DANS UN INPUT</label>
                                    <input type="text" id="input-test" value={modif.message} onChange={handleTextModalChange}/>
                                </span>
                            </Typography>
                            <div className="modal_footer">
                                <Button className="modal_btn" onClick={handleClose}>Annuler</Button>
                                <Button type="submit" className="modal_btn">Valider</Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
                {messages.map((msg) =>
                    <div className="card" key={msg.id}>
                        <div className="card-head">
                            <p className="font-20">{msg.author}</p>
                            <i className="font-12 light" >{msg.author}</i>
                        </div>
                        <div className="card-content">
                            {msg.imageSrc && <img src={"http://localhost:3000/images/"+ msg.imageSrc } alt="Photo accompagnant le message" className="attachement" />}
                            <p className="text_message">{msg.message}</p>
                        </div>
                        <div className="card-footer">
                            <p><span className="likeBtn" onClick={(like) => likeMessage(msg.id,user_logged.user_id)}>
                                {like(msg.usersLiked) ? "👎 Je n'aime plus" : "👍 J'aime"}
                            </span> ({msg.like})</p>
                            <div className="btn_footer">
                                {(msg.userId === user_logged.user_id || user_logged.isAdmin) &&
                                    <p className="modify footer_btn" onClick={(e) => handleOpen(msg.id)}>Modifier</p>
                                }
                                {(msg.userId === user_logged.user_id || user_logged.isAdmin) &&
                                    <p className="suppress footer_btn" onClick={(e) => delete_message(msg.id)}>Supprimer</p>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <aside className="aside"></aside>
        </div>
    )
}
