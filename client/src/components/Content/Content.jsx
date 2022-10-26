import './Content.scss';
import {getMessages} from "../../services/messages"
import {Message} from './Message'
import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {ModalModif} from "./ModalModif";
import {MessagePost} from "./MessagePost";
import {Aside} from "./Aside";

/**
 *
 * Composant contenant tout le contenu du site.
 */
export default function Content() {
    /**
     * déclarations des States nécessaires
     */
    const user_logged = useSelector((state) => state.user)
    const [messages, setMessages] = useState([])
    const [modif, setModif] = useState({})
    const [open, setOpen] = useState(false)

    /**
     * fonction permettant de récupérer les messages depuis le serveur
     */
    const getMsg = () => {
        getMessages({token: user_logged.token}).then((res) => {
            const triage = res.all_posts.sort((a, b) => {
                //triage des messages par le champ updatedTimestamp pour
                //classer les messages du plus récent au plus vieux.
                return b.updatedTimestamp - a.updatedTimestamp
            })
            setMessages(triage)
        })
    }

    useEffect(() => {
        getMsg()
    }, [])

    return (
        <div className="content">
            <Aside />
            <main className="container">
                <MessagePost />
                {messages.map((msg) =>
                    <Message key={msg.id}
                             datas={msg}
                             messages={messages}
                             setModif={setModif}
                             setOpen={setOpen}
                             users={msg.usersLiked}
                    />
                )}
                <ModalModif modif={modif}
                            setModif={setModif}
                            setOpen={setOpen}
                            open={open}
                />
            </main>
            <Aside />
        </div>
    )
}
