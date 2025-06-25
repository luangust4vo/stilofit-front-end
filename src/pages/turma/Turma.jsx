import { Outlet } from "react-router-dom";

export default function Turma() {
  return (
    <div className="container-turma">
      <h1>Gerenciar Turmas</h1>
      <Outlet />
    </div>
  );
}
