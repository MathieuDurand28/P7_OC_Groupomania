import './Content.scss';
import {postMessages, getMessages, deleteMessage} from "../../services/messages";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import nameSplit from "../../services/nameSplit";
import {useEffect, useState} from "react";



export default function Content() {
    const user_logged = useSelector((state) => state.user)
    const {register, handleSubmit} = useForm()
    const [messages, setMessages] = useState([])


    const getMsg = () => {
        getMessages().then((res) => setMessages(res.all_posts.reverse()))
    }

    const postMsg = async (data) => {
        const text_area = document.getElementById("text-area")
        await postMessages(
            {
                message: data.message,
                author: nameSplit(user_logged.email),
                email: user_logged.email,
                userId: user_logged.user_id
            }
        )
        getMsg()
        text_area.value = ""
    }

    const delete_message = async (id) => {
        await deleteMessage({id: id})
        getMsg()
    }

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
                {messages.map((msg) =>
                    <div className="card" key={msg.id}>
                        <div className="card-head">
                            <p className="font-20">{msg.author}</p>
                            {msg.userId === user_logged.user_id &&
                                <p className="suppress" onClick={(e) => delete_message(msg.id)}>supprimer</p>
                            }
                        </div>
                        <div className="card-content">
                            <p>{msg.message}</p>
                        </div>
                        <div className="card-footer">
                            <p>👍 {msg.like}</p>
                            <p>Commenter</p>
                        </div>
                    </div>
                )}
            </main>
            <aside className="aside"></aside>
        </div>
    )
}
