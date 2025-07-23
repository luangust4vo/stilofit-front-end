import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { Input } from "react-select/animated";
import Select from "react-select/base";

const RegistroFuncionario = () => {
    const methods = useForm({
        resolver: yupResolver(validationSchemaContract),
    });
    return (
        <div className="container-class">
            <main className="form-class">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="block">
                            <h3>Dados gerais do contrato</h3>
                            <Input label ="Nome do funcionário" name="nome" id="nome" required placeholder="Digite o nome do funcionário" />
                            <Input label="CPF" name="cpf" id="cpf" required placeholder="Digite o CPF do funcionário" />
                            <Input label="RG" name="rg" id="rg"  placeholder="Digite o RG do funcionário" />
                            <Input label="Sexo" name="sexo" id="sexo" required placeholder="Digite o sexo do funcionário" />
                            <Input label="Data de Nascimento" name="dataNascimento" id="dataNascimento" placeholder="Digite a data de nascimento do funcionário" type="date" />
                            <Select label="Estado Civil" name="estadoCivil" id="estadoCivil">
                                <option value="">Selecione o estado civil</option>
                                <option value="solteiro">Solteiro</option>
                                <option value="casado">Casado</option>
                                <option value="divorciado">Divorciado</option>
                                <option value="viuvo">Viúvo</option>
                                <option value="outro">Outro</option>
                            </Select>
                            <Input label="E-mail" name="email" id="email" required placeholder="Digite o e-mail do funcionário" />
                            <Input label="Senha" name="senha" id="senha" required placeholder="Digite a senha do funcionário" type="password" />
                            <Input label="Telefone" name="telefone" id="telefone"  placeholder="Digite o telefone do funcionário" />
                             <Input label="Registro Profissional" name="registroProfissional" id="registroProfissional" required placeholder="Digite o registro profissional do funcionário" />
                            <Input label="Cargo" name="cargo" id="cargo" required placeholder="Digite o cargo do funcionário" />
                            <Select label="Jornada de Trabalho" name="jornadaTrabalho" id="jornadaTrabalho">
                                <option value="">Selecione a jornada de trabalho</option>
                                <option value="matutino">Matutino</option>
                                <option value="vespertino">Vespertino</option>
                                <option value="noturno">Noturno</option>
                            </Select>
                            <Select label="Status" name="status" id="status">
                                <option value="">Selecione o status</option>
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Cancelado</option>
                            </Select>

                        </div>
                    </form>
                </FormProvider>
            </main>
        </div>
    );
};

export default RegistroFuncionario;
