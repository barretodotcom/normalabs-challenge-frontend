import { useContext, useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs';
import { AuthContext } from '../context/authContext';
import './CreateTask.css'
import CustomInput from './CustomInput'

export default function CreateTask() {

    const { createServiceDesk } = useContext(AuthContext);

    const [title, setTitle] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [initialDate, setInitialDate] = useState<Date | string>('');
    const [finalDate, setFinalDate] = useState<Date | string>('');
    async function handleSubmitTask() {
        await createServiceDesk({ title, details, initialDate, finalDate });
    }

    return (
        <div className="create-task-container card-shadow">
            <div className='create-task-container-title'>
                <p className='poppins'>
                    Criar nova tarefa:
                </p>
            </div>
            <div className='create-task-container-inputs-container'>
                <CustomInput type='text' label='Título' placeholder='Ex: criar formulário para cadastro.' setValue={setTitle} value={title} />
                <CustomInput type='text' label='Detalhes' placeholder='Ex: 5 endpoints, CREATE, READ, DELETE, UPDATE e PATCH' setValue={setDetails} value={details} />
                <CustomInput type="date" label="Data de início" setValue={setInitialDate} value={initialDate} />
                <CustomInput type="date" label="Data do finalizacão" setValue={setFinalDate} value={finalDate} />

                <div onClick={() => handleSubmitTask()} className='create-task-container-inputs-button'>
                    <span className='create-task-button-label poppins'>Criar tarefa</span>
                    <BsArrowRightShort className='create-task-button-arrow-icon' />
                </div>

            </div>
        </div>
    )
}