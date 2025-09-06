import { loginValidationSchema } from "../../schemas";
import xLogo from "../../assets/x_sem_fundo.png";
import "./styles.scss";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useKeyPressed from "../../hooks/useKeyPressed";
import { useNavigate } from "react-router-dom";
import { LoginInput, Button } from "../../components";

export default function Login() {
  const navigate = useNavigate();
  const capsLockAtivo = useKeyPressed("CapsLock");

  const methods = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <div className="background"></div>
      <div className="login-container">
        <div className="login-box">
          <img src={xLogo} alt="logo" className="logo" />
          <FormProvider {...methods}>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <LoginInput name="email" label="Email" required />
              <LoginInput
                name="password"
                label="Senha"
                type="password"
                required
              />
              <div className="div-caps">
                {capsLockAtivo && <p className="msg-caps">CapsLock ATIVADO</p>}
              </div>
              <Button className="button" aria-label="Entrar">
                Entrar
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
