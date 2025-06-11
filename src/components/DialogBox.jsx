import { FormProvider } from "react-hook-form";
import { Button } from "../components";

export default function DialogBox({
  title,
  onConfirm,
  onCancel,
  methods,
  children,
}) {
  return (
    <FormProvider {...methods}>
      <div className="modal-overlay">
        <div className="modal">
          {title && <h3>{title}</h3>}

          <div className="modal-fields">
            {children}
          </div>

          <div className="modal-actions">
            <Button onClick={onConfirm}>Confirmar</Button>
            <Button onClick={onCancel}>Cancelar</Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
