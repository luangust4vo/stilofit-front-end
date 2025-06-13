import xLogo from "../../assets/x.png"; // ou então public/assets
import "./styles.scss";

export default function Login() {
  return (
    <div className="login-wrapper">
      <div className="background"></div>
      <div className="login-container">
        <div className="login-box">
          <img src={xLogo} alt="logo" />
          <form className="form">
            <input className="input" type="email" placeholder="Email"/>
            <input className="input" type="password" placeholder="Senha"/>
            <button className="button" type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
