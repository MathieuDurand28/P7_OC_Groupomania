import {useForm} from 'react-hook-form'
import './Login.scss';
import {useState} from "react";
import {GetSignUp, GetLogin} from "../../services/auth"
import {useDispatch} from "react-redux";
import {add_user} from "../../services/features/user/userSlice";

/**
 * 
 * Composant Login / signup
 */
function Login() {
  /**
   * déclarations des states nécessaires.
   */
  const {register, handleSubmit} = useForm()
  const [errorMessages, setErrorMessages] = useState({});
  const [modeForm, updateModeForm] = useState({message: "Se connecter", login: true, signup: false})
  const dispatch = useDispatch()

  /**
   * action au submit du formulaire du login / signup
   */
  const onSubmit = (data) => {
    // vérification des champs mail et mot de passe non vides.
    if (data.email.length <= 0){
      setErrorMessages({ name: "email", message: "l'Email ne peut être vide." });
    } else if (data.password.length <= 0){
        setErrorMessages({ name: "password", message: "Le mot de passe ne peut être vide." });
      } else {
        if (modeForm.login){
          GetLogin(data).then(r => {
            if (!r.token){
              setErrorMessages({ name: "auth", message: r.message });
            } else {
              dispatch(add_user(r))
              localStorage.setItem("user", JSON.stringify(r.token))
              setErrorMessages({})
            }
          })
        } else if (modeForm.signup){
          GetSignUp(data).then(r => {
            if (!r.token){
              setErrorMessages({ name: "auth", message: r.message });
            } else {
              dispatch(add_user(r))
              localStorage.setItem("user", JSON.stringify(r.token))
              setErrorMessages({})
            }
          })
        }
    }
  }

/**
 * 
 * @param name 
 * fonction permettant d'afficher le message d'erreur dans la page du login
 */
  const renderErrorMessage = (name) =>
      name === errorMessages.name && (
          <div className="error">{errorMessages.message}</div>
      );

  /**
   * Switch entre login / signup
   */
  const signUpForm = () => {
    updateModeForm({message: "Créer le compte", login: false, signup: true })
  }

  /**
   * Switch entre login / signup
   */
  const loginForm = () => {
    updateModeForm({message: "Se connecter", login: true, signup: false})
  }

  
  return (
    <div className="container">
      <img src="logos/icon-left-font-monochrome-black.svg" alt="Logo de Groupomania"/>
      <article className="card-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bloc-form">
            <label htmlFor="mail" className="label-login font-25">E-mail: </label>
            <input type="email" className="input-login" name="mail" id="mail" {...register("email")}/>
          </div>
          <div className="bloc-form">
            <label htmlFor="password" className="label-login font-25">Mot de passe: </label>
            <input type="password" className="input-login" name="password" id="password" {...register("password")}/>
          </div>
          <div className="bloc-form-submit error">
            {renderErrorMessage("email")}
            {renderErrorMessage("password")}
            {renderErrorMessage("auth")}
          </div>
          <div className="bloc-form-submit">
            <button type="submit" className="button">{modeForm.message}</button>
          </div>
        </form>
        { modeForm.login
            ? <p className="create-account" onClick={signUpForm}>Créer un compte</p>
            : <p className="create-account" onClick={loginForm}>Retour au login</p>
        }
      </article>
    </div>
  );
}

export default Login;
