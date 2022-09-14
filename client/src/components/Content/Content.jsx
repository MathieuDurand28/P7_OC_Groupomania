import './Content.scss';
import {postMessages, getMessages} from "../../services/messages";
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
                email: user_logged.email
            }
        )
        getMsg()
        text_area.value = ""
    }

    useEffect(() => {
        getMsg()
    }, [])

    return (
        <div className="content">
            <aside className="aside"></aside>
            <main className="container">
                <div className="posts_container">
                    <form onSubmit={handleSubmit(postMsg)}>
                        <div className="post_message">
                            <textarea id="text-area" {...register("message")}></textarea>
                        </div>
                        <button type="submit" className="new_post">
                            Poster un message
                        </button>
                    </form>
                </div>
                {messages.map((msg) =>
                    <div className="card" key={msg.id}>
                        <div className="card-head">
                            <p className="font-20">{msg.author}</p>
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
