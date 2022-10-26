import './Message.scss'
import {useSelector} from "react-redux";
import {deleteMessage, likeManager, suppresImage} from "../../services/messages";
const api = require('../../apiSetting/config.json')


export const Message = (props) => {
    const user_logged = useSelector((state) => state.user)
    const msg = props.datas

    /**
     *
     * @param users
     * Fonction permettant de savoir si un utilisateur à déj& aimé un message.
     */
    const like = (users) => {
        const arrayOfUsers = users.split(";")
        let find = false
        if (arrayOfUsers.length > 0) {
            arrayOfUsers.map((users) => {
                if (users === user_logged.user_id.toString()) {
                    find = true
                }
            })
        }
        return find
    }

    /**
     *
     * @param id
     * fonction permettant de liker un message
     */
    const likeMessage = async (msg_id, user_id) => {
        await likeManager({userId: user_id, msgId: msg_id, token: user_logged.token})
    }

    /**
     *
     * @param id
     * fonction permettant de supprimer un message
     * @param imageSrc
     */
    const delete_message = async (id, imageSrc) => {
        if (imageSrc){
            await suppresImage({
                msgId: id,
                image: imageSrc,
                token: user_logged.token
            })
        }

        await deleteMessage({id: id, token: user_logged.token})
    }



    /**
     *
     * @param id
     * fonction permettant d'afficher la modal de modification
     */
    const handleOpen = (id) => {
        props.messages.map((msg) => {
            if (msg.id === id) {
                props.setModif({
                    author: msg.author,
                    message: msg.message,
                    userId: msg.userId,
                    id: msg.id,
                    imageSrc: msg.imageSrc
                })
            }
        })
        props.setOpen(true);
    }

    return (
        <div className="card" key={msg.id}>
            <div className="card-head">
                <p className="font-20">{msg.author}</p>
                <i className="font-12 light">{msg.updatedUtcDate}</i>
            </div>
            <div className="card-content">
                {msg.imageSrc && <img src={`${api.api_public}/images/` + msg.imageSrc}
                                      alt="Photo accompagnant le message" className="attachement"/>}
                <p className="text_message">{msg.message}</p>
            </div>
            <div className="card-footer">
                <p><span className="likeBtn" onClick={(like) => likeMessage(msg.id, user_logged.user_id)}>
                                {like(props.users) ? "👎 Je n'aime plus" : "👍 J'aime"}
                            </span> ({msg.like})</p>
                <div className="btn_footer">
                    {(msg.userId === user_logged.user_id || user_logged.isAdmin) &&
                        <p className="modify footer_btn" onClick={(e) => handleOpen(msg.id)}>Modifier</p>
                    }
                    {(msg.userId === user_logged.user_id || user_logged.isAdmin) &&
                        <p className="suppress footer_btn"
                           onClick={(e) => delete_message(msg.id, msg.imageSrc)}>Supprimer</p>
                    }
                </div>
            </div>
        </div>
    )
}
