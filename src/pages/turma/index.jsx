import React from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './index.scss';

import ColorPicker from '../../components/selecaoCores';
import {
  Input,
  Select,
  Textarea,
  Button,
} from "../../components";

const locaisPredefinidos = ['Sala 101', 'Laboratório 2', 'Auditório'];

const validationSchema = Yup.object().shape({
  turma: Yup.string().required('Nome da turma é obrigatório'),
  vagas: Yup.number()
    .typeError('Deve ser um número')
    .required('Número de vagas é obrigatório')
    .positive('Deve ser positivo')
    .integer('Deve ser inteiro'),
  tempo: Yup.number()
    .typeError('Informe a duração em minutos')
    .required('Duração é obrigatória')
    .positive('Deve ser um número positivo')
    .integer('A duração deve ser em minutos inteiros'),
  local: Yup.string().required('Local da aula é obrigatório'),
  novoLocal: Yup.string().when('local', {
    is: 'outro',
    then: Yup.string().required('Digite o novo local'),
    otherwise: Yup.string(),
  }),
  observacoes: Yup.string().max(300, 'Máximo de 300 caracteres'),
  cor: Yup.string().required('Selecione uma cor'),
});

function Formulario() {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      turma: '',
      vagas: '',
      tempo: '',
      local: '',
      novoLocal: '',
      observacoes: '',
      cor: '#000000',
    },
  });

  const { handleSubmit } = methods;
  const localSelecionado = useWatch({ name: 'local', control: methods.control });

  const onSubmit = (data) => {
    const localFinal = data.local === 'outro' ? data.novoLocal : data.local;

    const novaTurma = {
      turma: data.turma,
      vagas: data.vagas,
      tempo: `${data.tempo} minutos`,
      local: localFinal,
      observacoes: data.observacoes,
      cor: data.cor,
    };

    const turmasSalvas = JSON.parse(localStorage.getItem('turmas')) || [];
    turmasSalvas.push(novaTurma);
    localStorage.setItem('turmas', JSON.stringify(turmasSalvas));

    console.log('Turma salva:', novaTurma);
    alert('Turma cadastrada com sucesso!');
  };

  return (
    <div className="container">
      <FormProvider {...methods}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1>Cadastro de Turma</h1>

          <Input
            className="inputStyle"
            name="turma"
            id="turma"
            label="Nome da turma"
            required
            placeholder="Digite o nome da turma"
          />

          <div className="row">
            <Input
              className="inputStyle"
              name="vagas"
              id="vagas"
              label="Quantidade de vagas"
              required
              placeholder="Ex: 30"
            />
            <Input
              className="inputStyle"
              name="tempo"
              id="tempo"
              label="Duração (minutos)"
              required
              placeholder="Ex: 50"
            />
            <Select
              name="local"
              id="local"
              label="Local da aula"
              required
            >
              <option value="">Selecione o local</option>
              {locaisPredefinidos.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
              <option value="outro">Outro...</option>
            </Select>
          </div>

          {localSelecionado === 'outro' && (
            <Input
              name="novoLocal"
              id="novoLocal"
              label="Novo local"
              required
              placeholder="Digite o novo local"
            />
          )}

          <Textarea
            name="observacoes"
            id="observacoes"
            label="Observações"
            placeholder="Caso necessário"
          />

          <ColorPicker name="cor" />

          <Button type="submit">Cadastrar Turma</Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default Formulario;
