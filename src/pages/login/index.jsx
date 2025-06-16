import { validationSchemaLogin } from "../../utils/validation";
import xLogo from "../../assets/x.png"; // ou então public/assets
import "./styles.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useKeyPressed from "../../hooks/useKeyPressed";

export default function Login() {
  const capsLockAtivo = useKeyPressed("CapsLock");

  const methods = useForm({
    resolver: yupResolver(validationSchemaLogin),
  });

  return (
    <div className="login-wrapper">
      <div className="background"></div>
      <div className="login-container">
        <div className="login-box">
          <img src={xLogo} alt="logo" />
          <form className="form">
            <input className="input" placeholder="Email" />
            <input className="input" placeholder="Senha" type="password" />
            <div className="div-caps">
              {capsLockAtivo ? (
                <p className="msg-caps">CapsLock ATIVADO</p>
              ) : (
                <></>
              )}
            </div>
            <button className="button">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
