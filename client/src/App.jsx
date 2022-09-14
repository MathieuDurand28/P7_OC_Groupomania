import Login from './views/Login/Login'
import Home from './views/Home/Home'
import './App.scss'
import {useSelector} from "react-redux";

function App(){
    const user_logged = useSelector((state) => state)

    return (
        user_logged.user ? <Home /> : <Login />
    )
}


export default App









