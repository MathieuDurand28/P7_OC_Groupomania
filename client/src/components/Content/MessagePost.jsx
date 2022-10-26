import './MessagePost.scss'
import api from "../../apiSetting/config.json";
import {postMessages} from "../../services/messages";
import nameSplit from "../../services/nameSplit";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useSelector} from "react-redux";

export const MessagePost = (props) => {
    const user_logged = useSelector((state) => state.user)
    const {register, handleSubmit} = useForm()
    const [file, setFile] = useState("")
    const [originalFileName, setOriginalFileName] = useState("")

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
     * fonction appelée lors la soumission du formulaire d'envoi de message.
     *
     */
    const postMsg = async (data) => {
        const text_area = document.getElementById("text-area")
        const formData = new FormData()
        let newImageName = ""
        console.log()
        //contrôle si le message n'est pas vide ou si un fichier est uploadé
        if ((text_area.value.length <= 0 || !text_area.value.replace(/\s/g, '').length) && file.length <= 0) {
            alert('Votre message est vide.')
        } else {
            //si un fichier est uploadé, envoi du fichier au serveur
            if (file.length > 0) {
                formData.append('myFile', file[0])
                await fetch(`${api.api_url}/msg/postImage`, {
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
    }


    return (
        <form className="posts_container" method="post" encType="multipart/form-data"
              onSubmit={handleSubmit(postMsg)}>
            <div className="post_message">
                <textarea id="text-area"></textarea>
            </div>
            <div className="image-post">
                <label htmlFor="image_post">Ajouter une image</label>
                <input type="file" id="image_post" name="image_post" {...register("imageFile")}
                       onChange={handleChange}/>
                <span id="file-name">{originalFileName}</span>
            </div>
            <button type="submit" className="new_post">
                Poster un message
            </button>
        </form>
    )
}
