import './ModalModif.scss'
import {Box, Button, Typography} from "@material-ui/core";
import api from "../../apiSetting/config.json";
import Modal from "@material-ui/core/Modal";
import {suppresImage, updateMessage} from "../../services/messages";
import nameSplit from "../../services/nameSplit";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";

export const ModalModif = (props) => {
    const user_logged = useSelector((state) => state.user)
    const [newFile, setNewFile] = useState("")
    const [newFileName, setNewFileName] = useState("")
    const [suppresImageModal, setsuppresImageModal] = useState({suppress: false, name: ""})
    const {register, handleSubmit} = useForm()



    /**
     *
     * @param e
     * Fonction permettant de supprimer une image.
     */
    const modal_image_suppress = (e) => {
        e.preventDefault()
        setsuppresImageModal({suppress: true, name: props.modif.imageSrc})
        props.setModif({...props.modif, imageSrc: ""})
    }

    const handleTextModalChange = (event) => {
        props.setModif({...props.modif, message: event.target.value})
    }

    /**
     *
     * @param id
     * fonction permettant de fermer la modal de modification
     */
    const handleClose = async () => {
        setsuppresImageModal({suppress: false, name: ""})
        setNewFileName("")
        props.setOpen(false);
    };


    /**
     *
     * @param datas
     * Fonction permettant de supprimer / modifier un message depuis la modal de modification
     */
    const postModal = async (datas) => {
        let imageName = ""
        const text_area = document.getElementById("text_modal")
        const messageModal = text_area.value

        if (suppresImageModal.suppress) {
            await suppresImage({
                msgId: props.modif.id,
                image: suppresImageModal.name,
                token: user_logged.token
            })
        }

        if (newFile.length > 0) {
            const newformData = new FormData()
            newformData.append('myFile', newFile[0])
            await fetch(`${api.api_url}/msg/postImage`, {
                method: 'POST',
                body: newformData,
            })
                .then(response => response.json())
                .then((result) => {
                    imageName = result.full_name
                    setNewFileName("")
                    setNewFile("")
                })
                .catch(error => {
                    console.error(error)
                })
        }
        await updateMessage(
            {
                message: (messageModal.replace(/\s/g, '').length) ? messageModal : "",
                author: nameSplit(user_logged.email),
                email: user_logged.email,
                userId: user_logged.user_id,
                token: user_logged.token,
                id: props.modif.id,
                newFileName: imageName
            }
        )
        await handleClose()
        props.getMsg()
    }

    /**
     *
     * fonction surveillant le changement de fichier dans la modal de modification
     */
    function handleChangeModal(event) {
        const input_image = event.target.files
        const image_modal = document.getElementById('image-modal')
        image_modal.src = (URL.createObjectURL(event.target.files[0]))
        if (props.file) {
            setsuppresImageModal({suppress: true, name: props.modif.imageSrc})
        }

        setNewFileName(input_image[0].name)
        setNewFile(input_image)
    }


    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="modal">
                <form onSubmit={handleSubmit(postModal)}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Modification du message de {props.modif.author}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                <span className="modal_content image-post-modal">
                                    <img src={props.modif.imageSrc && `${api.api_public}/images/` + props.modif.imageSrc}
                                         alt={props.modif.imageSrc && "Photo accompagnant le message"}
                                         className="attachement-modal" id="image-modal"/>
                                    <label
                                        htmlFor="image_post_modal">{props.modif.imageSrc ? "Changer image" : "Ajouter image"}</label>
                                    <input type="file" id="image_post_modal"
                                           name="image_post_modal" {...register("imageFileModal")}
                                           onChange={handleChangeModal}/>
                                    <span id="file-name">{newFileName}</span>
                                    {props.modif.imageSrc &&
                                        <span className="modal_content_footer">
                                            <button className="modal_btn" onClick={(e) => modal_image_suppress(e)}>Supprimer l'image</button>
                                        </span>
                                    }
                                    <textarea className="textarea" name="description" id="text_modal"
                                              value={props.modif.message} onChange={handleTextModalChange}/>
                                </span>
                    </Typography>
                    <div className="modal_footer">
                        <Button className="modal_btn" onClick={handleClose}>Annuler</Button>
                        <Button type="submit" className="modal_btn">Valider</Button>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}
