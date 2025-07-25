import React, { useEffect, useState } from "react";

const InfoEmployee = ({ id, onClose }) => {
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem("funcionarios")) || [];
        const found = storage.find((e) => e.id === id);
        setEmployee(found);
    }, [id]);

    return (
        <div className="container-employee-info">
            <button onClick={onClose} style={{ marginBottom: "1rem" }}>
                ← Voltar
            </button>

            {employee ? (
                <>
                    <p><strong>Nome:</strong> {employee.nome}</p>
                    <p><strong>CPF:</strong> {employee.cpf}</p>
                    <p><strong>RG:</strong> {employee.rg}</p>
                    <p><strong>Sexo:</strong> {employee.sexo}</p>
                    <p><strong>Data de Nascimento:</strong> {employee.dataNascimento}</p>
                    <p><strong>Estado Civil:</strong> {employee.estadoCivil}</p>
                    <p><strong>Email:</strong> {employee.email}</p>
                    <p><strong>Telefone:</strong> {employee.telefone}</p>
                    <p><strong>Registro Profissional:</strong> {employee.registroProfissional}</p>
                    <p><strong>Cargo:</strong> {employee.cargo}</p>
                    <p><strong>Jornada de Trabalho:</strong> {employee.jornadaTrabalho}</p>
                    <p><strong>Status:</strong> {employee.status}</p>
                </>
            ) : (
                <p>Funcionário não encontrado.</p>
            )}
        </div>
    );
};

export default InfoEmployee;
