import { data } from 'react-router-dom';
import './index.scss'

function Formulario() {
    return (
            <div className='container'>
                <form>
                    <div className='form-context'>
                        <section className='header'>
                            <h1>Cadastro de turma</h1>
                        </section>
                        <label for='userName'><h2>Informe o nome da turma</h2></label>
                        <input type="text" name="Turma" id="turma" placeholder='Digite o nome da turma: ' required />
                        <input type="text" name="Vagas" id="vaga" placeholder='Digite a quantidade de vagas: ' required />
                        <input type="date" name="Tempo" id="temp" placeholder='Tempo' />
                        <input type="text" name="Observacoes" id="obs" placeholder='Digite aqui o comentário:' />
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