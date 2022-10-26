import './Content.scss';
import {Messages} from './Messages'
import {useSelector} from "react-redux"
import {useState} from "react"
import {ModalModif} from "./ModalModif";
import {MessagePost} from "./MessagePost";
import {Aside} from "./Aside";
import {getMessages} from "../../services/messages";

/**
 *
 * Composant contenant tout le contenu du site.
 */
export default function Content() {
    /**
     * déclarations des States nécessaires
     */
    const [messages, setMessages] = useState([])
    const [modif, setModif] = useState({})
    const [open, setOpen] = useState(false)
    const user_logged = useSelector((state) => state.user)

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


    return (
        <div className="content">
            <Aside />
            <main className="container">
                <MessagePost getMsg={getMsg} />
                <Messages setModif={setModif}
                          setOpen={setOpen}
                          getMsg={getMsg}
                          messages={messages}
                />
                <ModalModif modif={modif}
                            setModif={setModif}
                            setOpen={setOpen}
                            open={open}
                            getMsg={getMsg}
                />
            </main>
            <Aside />
        </div>
    )
}
