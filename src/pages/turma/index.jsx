import React from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './index.scss';

import {
  Input,
  Select,
  Textarea,
  Button,
  DateTimePicker,
} from "../../components"; 

const locaisPredefinidos = ['Sala 101', 'Laboratório 2', 'Auditório'];

const validationSchema = Yup.object().shape({
  turma: Yup.string().required('Nome da turma é obrigatório'),
  vagas: Yup.number().typeError('Deve ser um número').required('Número de vagas é obrigatório').positive().integer(),
  tempo: Yup.date().required('Data e hora obrigatórias').min(new Date(), 'Escolha uma data futura'),
  local: Yup.string().required('Local da aula é obrigatório'),
  novoLocal: Yup.string().when('local', {
    is: 'outro',
    then: Yup.string().required('Digite o novo local'),
    otherwise: Yup.string(),
  }),
  observacoes: Yup.string().max(300),
  cor: Yup.string().required('Selecione uma cor'),
});

function Formulario() {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      turma: '',
      vagas: '',
      tempo: null,
      local: '',
      novoLocal: '',
      observacoes: '',
      cor: '',
    },
  });

  const { handleSubmit } = methods;
  const localSelecionado = useWatch({ name: 'local', control: methods.control });

  const onSubmit = (data) => {
    const localFinal = data.local === 'outro' ? data.novoLocal : data.local;
    const turma = {
      ...data,
      local: localFinal,
    };
    console.log('Turma:', turma);
  };

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Cadastro de Turma</h1>

        <Input name="turma" id="turma" label="Nome da turma" required placeholder="Digite o nome da turma" />
        <Input name="vagas" id="vagas" label="Quantidade de vagas" required placeholder="Digite a quantidade de vagas" />
        <DateTimePicker name="tempo" id="time" label="Data e Hora" required />

        {/* Local com opção "Outro" */}
        <Select name="local" id="local" label="Local da aula" required>
          <option value="">Selecione o local</option>
          {locaisPredefinidos.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
          <option value="outro">Outro...</option>
        </Select>

        {/* Novo local (aparece apenas se necessário) */}
        {localSelecionado === 'outro' && (
          <Input name="novoLocal" id="novoLocal" label="Novo local" required placeholder="Digite o novo local" />
        )}

        <Textarea name="observacoes" id="observacao" label="Observações" placeholder="Caso necessário" />
        <Button type="submit">Cadastrar Turma</Button>
      </form>
    </FormProvider>
  );
}

export default Formulario;
