import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './index.scss';
import ColorPicker from '../../components/selecaoCores';

import {
  Input,
  Select,
  Textarea,
  Button,
  DateTimePicker,
  MaskedInput
} from "../../components"; 


const validationSchema = Yup.object().shape({
    turma: Yup.string().required('Nome da turma é obrigatório'),
    vagas: Yup.number().typeError('Deve ser um número').required('Número de vagas é obrigatório').positive('Deve ser positivo').integer('Deve ser um número inteiro'),
    tempo: Yup.date().required('Data e hora obrigatórias').min(new Date(), 'Escolha uma data futura'),
    local: Yup.string().required('Local da aula é obrigatório'),
    observacoes: Yup.string().max(300, 'Máximo de 300 caracteres'),
    cor: Yup.string().required('Selecione uma cor').notOneOf([''], 'Selecione uma cor válida'),
});

function Formulario() {
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            turma: '',
            vagas: '',
            tempo: null,
            local: '',
            observacoes: '',
            cor: '',
        },
    });

    const onSubmit = (data) => {
        console.log('Dados enviados:', data);
    };

    return (
        <FormProvider {...methods}>
            <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
                <h1>Cadastro de Turma</h1>

                <Input name="turmas" id="turma" label="Nome da turma" required placeholder="Digite o nome da turma" />
                <Input name="vaga" id="vagas" label="Quantidade de vagas" required placeholder="Digite a quantidade de vagas" />
                <DateTimePicker name="tempo" id="time" label="Data e Hora" required />
                <Input name="local" id="local" label="Local da aula" required placeholder="Digite o local da aula" />
                <Textarea name="observacoes" id="observacao" label="Observações" placeholder="Caso necessário" />

                <ColorPicker name="cor" label="Selecione uma Cor" required/>

                <Button type="submit">Cadastrar Turma</Button>
            </form>
        </FormProvider>
    );
}

export default Formulario;
