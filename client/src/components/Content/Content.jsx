import './Content.scss';
import {postMessages, getMessages, deleteMessage, likeManager} from "../../services/messages"
import Modal from '@material-ui/core/Modal';
import {useForm} from "react-hook-form"
import {useSelector} from "react-redux"
import nameSplit from "../../services/nameSplit"
import {useEffect, useState} from "react"
import {Box, Button, Typography} from "@material-ui/core";



export default function Content() {
    const user_logged = useSelector((state) => state.user)
    const {register, handleSubmit} = useForm()
    const [messages, setMessages] = useState([])
    const [modif, setModif] = useState({})
    const [open, setOpen] = useState(false)


    const getMsg = () => {
        getMessages({token: user_logged.token}).then((res) => setMessages(res.all_posts.reverse()))
    }

    const postMsg = async (data) => {
        const text_area = document.getElementById("text-area")
        if (data.message.length > 0){
            await postMessages(
                {
                    message: data.message,
                    author: nameSplit(user_logged.email),
                    email: user_logged.email,
                    userId: user_logged.user_id,
                    token: user_logged.token
                }
            )
            getMsg()
            text_area.value = ""
        } else {
            alert('Votre message est vide.')
        }

    }

    const delete_message = async (id) => {
        await deleteMessage({id: id,token: user_logged.token})
        getMsg()
    }

    const modif_message = async (id) => {
        setModif(id)
    }

    const likeMessage = async (msg_id,user_id) => {
        console.log(user_id,msg_id)
        await likeManager({userId:user_id,msgId:msg_id,token: user_logged.token})
        getMsg()
    }

    const handleOpen = (id= 0) => {
        messages.map((msg) => {
            if (msg.id === id){
                setModif({
                    author: msg.author,
                    message: msg.message,
                    userId: msg.userId
                })
                setOpen(true);
            }
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getMsg()
    }, [])

    return (
        <div className="content">
            <aside className="aside"></aside>
            <main className="container">
                <form className="posts_container" onSubmit={handleSubmit(postMsg)}>
                    <div className="post_message">
                        <textarea id="text-area" {...register("message")}></textarea>
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
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Modification du message de {modif.author}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <textarea className="textarea" name="description" defaultValue={modif.message} />
                        </Typography>
                        <Button onClick={handleClose}>Annuler</Button>
                        <Button variant="contained" color="primary">Valider</Button>
                    </Box>
                </Modal>
                {messages.map((msg) =>
                    <div className="card" key={msg.id}>
                        <div className="card-head">
                            <p className="font-20">{msg.author}</p>
                        </div>
                        <div className="card-content">
                            <p>{msg.message}</p>
                        </div>
                        <div className="card-footer">
                            <p><span className="likeBtn" onClick={(like) => likeMessage(msg.id,user_logged.user_id)}>👍</span> {msg.like}</p>
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
