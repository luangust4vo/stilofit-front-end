import { data } from 'react-router-dom';
import './index.scss'
import * as Yup from 'yup';
const validacoes = Yup.object().shape({
    vagas: Yup.number().typeError('Deve ser um Número').required('É nescessário preencher o campo').positive().integer(),
    
})
function Formulario() {
    return (
            <div className='container'>
                <form>
                    <div className='form-context'>
                        <section className='header'>
                            <h1>Cadastro de turma</h1>
                        </section>
                        <label for='userName'><h2>Informe o nome da turma</h2></label>
                        <input type="text" name="Turma" id="turma" placeholder='Digite o nome da turma: ' />
                        <input type="text" name="Vagas" id="vaga" placeholder='Digite a quantidade de vagas: ' required />
                        <input type="date" name="Tempo" id="temp" placeholder='Tempo' />
                        <input type="text" name="Local" id="local" placeholder='Digite o Local da aula: ' required />
                        <input type="text" name="Observacoes" id="obs" placeholder='Observação (Caso nescessário)' />
                        <select name="Cor" id="cores">
                            <option value="COR">Color</option>
                            <option value="COR">Color</option>
                            <option value="COR">Color</option>
                        </select>
                    </div>
                </form>
            </div>
  
    )
}

export default Formulario;