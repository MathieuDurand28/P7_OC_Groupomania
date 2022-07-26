import {useForm} from 'react-hook-form'
import './Login.scss';
import {useState} from "react";

function Login() {
  const {register, handleSubmit} = useForm()
  const [errorMessages, setErrorMessages] = useState({});
  const onSubmit = (data) => {

    if (data.email.length <= 0){
      setErrorMessages({ name: "email", message: "l'Email ne peut être vide" });
    }
    if (data.password.length <= 0){
      setErrorMessages({ name: "password", message: "Le mot de passe ne peut être vide" });
    }
    alert(JSON.stringify(data))
  }


  const renderErrorMessage = (name) =>
      name === errorMessages.name && (
          <div className="error">{errorMessages.message}</div>
      );

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
          </div>
          <div className="bloc-form-submit">
            <button type="submit" className="button">Se connecter</button>
          </div>
        </form>
        <p className="create-account">Créer un compte</p>
      </article>
    </div>
  );
}

export default Login;
