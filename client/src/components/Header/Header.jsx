import './Header.scss'
import {useDispatch, useSelector} from "react-redux";
import {kick_user} from "../../services/features/user/userSlice";
import nameSplit from "../../services/nameSplit";

/**
 * 
 * Composant Header contenant le haut de page.
 */
export default function Header() {
    const dispatch = useDispatch()
    const user_logged = useSelector((state) => state.user)
    const name = nameSplit(user_logged.email)

    const Quit = () => {
        dispatch(kick_user())
        if (localStorage.getItem('user')) {
            localStorage.setItem('user', "")
        }
    }

    return (
        <nav className="head font-15">
            <p className="quit_btn" onClick={Quit}>Quitter</p>
            <img src="logos/icon-left-font-monochrome-white.svg" alt="Logo de Groupomania"/>
            <p>{name}</p>
        </nav>
    )
}



