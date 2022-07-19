import React, { Dispatch, useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import './DeleteTaskBox.css'

interface IDeleteTaskBox {
    deletedServiceDesk: any;
    setDeletedServiceDesk: Dispatch<React.SetStateAction<any>>
}

export default function DeleteTaskBox({ deletedServiceDesk, setDeletedServiceDesk }: IDeleteTaskBox) {

    const { deleteServiceDesk } = useContext(AuthContext);

    const [sureBox, setSureBox] = useState<boolean>(false);
    const [reason, setReason] = useState('');

    async function handleDeleteTask() {
        const serviceDeskId = deletedServiceDesk.id
        await deleteServiceDesk({ serviceDeskId, reason });
        setDeletedServiceDesk(undefined);
    }

    return deletedServiceDesk ? (
        <div className='delete-task-box-container'>
            <div className='delete-task-box-white-box'>
                <div className='delete-task-box-white-box-title'>
                    <p className='poppins'>Tem certeza que deseja deletar a tarefa: {deletedServiceDesk.title}?</p>
                    <p className='poppins'>Esta ação não poderá ser desfeita.</p>
                    {sureBox == false ?
                        <div className='delete-task-box-white-box-sure'>
                            <button onClick={() => setSureBox(true)} className='elete-task-box-white-box-sure-button sucess-box pointer'>Tenho e quero continuar.</button>
                            <button onClick={() => setDeletedServiceDesk(undefined)} className='delete-task-box-white-box-sure-button error-box pointer'>Cancelar</button>
                        </div>
                        :
                        <div className='delete-task-box-white-box-textarea-container'>
                            <p className='poppins'>Escreva abaixo o motivo da exclusão:</p>
                            <textarea onChange={e => setReason(e.target.value)} className='delete-task-box-white-box-textarea' />
                            <button onClick={handleDeleteTask} className='delete-task-box-white-box-sure-button error-box pointer bold'>DELETAR</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    ) : null;
}