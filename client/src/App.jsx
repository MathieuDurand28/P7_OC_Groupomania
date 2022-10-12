import Login from './views/Login/Login'
import Home from './views/Home/Home'
import './App.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {checkingToken} from "./services/checkingToken";
import {add_user} from "./services/features/user/userSlice";

function App(){

    /**
     * déclaration des States utilisés
     */
    const user_logged = useSelector((state) => state)
    const dispatch = useDispatch()

    /**
     * déclenchement de useEffect au chargement et/ou changement de states
     * -- étape servant à rendre les connexions persistantes --
     *
     * vérification si un localstorage user existe:
     * si oui : requête serveur pour authentifier le token et insérer les données user dans le store Redux
     * si non : envoi vers le login
     *
     */
    useEffect(() => {
        if (localStorage.getItem('user') && user_logged.user === null ) {
            const token = {
                token: JSON.parse(localStorage.getItem('user'))
            }
            checkingToken(token).then((r) => r.user_id && dispatch(add_user(r)))

        }
    })

    return (
        user_logged.user ? <Home /> : <Login />
    )
}


export default App









