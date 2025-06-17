import { validationSchemaLogin } from "../../utils/validation";
import xLogo from "../../assets/x.png";
import "./styles.scss";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useKeyPressed from "../../hooks/useKeyPressed";
import { useNavigate } from "react-router-dom";
import { InputSimple, Button } from "../../components";

export default function Login() {
  const navigate = useNavigate();
  const capsLockAtivo = useKeyPressed("CapsLock");

  const methods = useForm({
    resolver: yupResolver(validationSchemaLogin),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {};

  return (
    <div className="login-wrapper">
      <div className="background"></div>
      <div className="login-container">
        <div className="login-box">
          <img src={xLogo} alt="logo" />
          <FormProvider {...methods}>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <InputSimple
                className="input"
                name="email"
                placeholder="Email"
                required
              />
              <InputSimple
                className="input"
                name="password"
                placeholder="Senha"
                type="password"
                required
              />
              <div className="div-caps">
                {capsLockAtivo ? (
                  <p className="msg-caps">CapsLock ATIVADO</p>
                ) : (
                  <></>
                )}
              </div>
              <Button className="button">Entrar</Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
