import React, { Dispatch, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { FaTasks } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';
import { AiFillDelete, AiOutlineClockCircle } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi'
import './TaskCard.css';

interface ITaskCard {
    oneServiceDesk: any;
    setDeletedServiceDesk: Dispatch<React.SetStateAction<any>>;
}

export default function TaskCard({ oneServiceDesk, setDeletedServiceDesk }: ITaskCard) {

    const { serviceDesk } = useContext(AuthContext)

    const initialDate = new Date(oneServiceDesk.initialDate);
    const finalDate = new Date(oneServiceDesk.finalDate);
    const serviceStatusColor = oneServiceDesk.status.toLowerCase() == "à fazer" ? "#ffdf51" : oneServiceDesk.status.toLowerCase() == 'feito' ? "green" : "black";
    const serviceStatusBorder = oneServiceDesk.status.toLowerCase() == "à fazer" ? "#e0b700" : oneServiceDesk.status.toLowerCase() == 'feito' ? "green" : "black";
    const serviceStatusText = oneServiceDesk.status.toLowerCase() == "à fazer" ? "#d3ac00" : oneServiceDesk.status.toLowerCase() == 'feito' ? "green" : "black";

    return (
        <div style={{ borderTop: `3.5px solid ${serviceStatusColor}` }} className="task-card-container card-shadow">
            <div className='task-card-container-card-title'>
                <h1 className='poppins'>Tarefa Nº {(serviceDesk?.indexOf(oneServiceDesk) as number) + 1}</h1>
                <AiFillDelete cursor={"pointer"} onClick={() => setDeletedServiceDesk(oneServiceDesk)} className='task-card-container-card-title-icon' />
            </div>

            <div className="task-card-container-card-title">
                <div className="task-card-container-card-title-labels">
                    <p className='poppins task-card-container-label-title'>Título</p>
                    <p className='poppins task-card-container-label-bold'>{oneServiceDesk.title}</p>
                </div>
                <BsPencilFill className='task-card-container-card-title-icon' />
            </div>

            <div className="task-card-container-card-title">
                <div className="task-card-container-card-title-labels">
                    <p className='poppins task-card-container-label-title'>Detalhes</p>
                    <p className='poppins task-card-container-label-bold'>{oneServiceDesk.details}</p>
                </div>
                <BsPencilFill className='task-card-container-card-title-icon' />

            </div>

            <div className="task-card-container-card-title">
                <div className="task-card-container-card-title-labels">
                    <p className='poppins task-card-container-label-title'>Data inicial</p>
                    <p className='poppins task-card-container-label-bold'>{`${initialDate.getDate().toString().padStart(2, "0")}/${(initialDate.getMonth() + 1).toString().padStart(2, "0")}/${initialDate.getFullYear()}`}</p>
                </div>
                <BsPencilFill className='task-card-container-card-title-icon' />
            </div>

            <div className="task-card-container-card-title">
                <div className="task-card-container-card-title-labels">
                    <p className='poppins task-card-container-label-title'>Data final</p>
                    <p className='poppins task-card-container-label-bold'>{`${finalDate.getDate().toString().padStart(2, "0")}/${(finalDate.getMonth() + 1).toString().padStart(2, "0")}/${finalDate.getFullYear()}`}</p>
                </div>
                <BsPencilFill className='task-card-container-card-title-icon' />
            </div>

            <div className="task-card-container-card-title">
                <div className="task-card-container-card-title-labels">
                    <p className='poppins task-card-container-label-title'>Status</p>
                    <button
                        style={{ backgroundColor: serviceStatusColor, border: `1px solid ${serviceStatusBorder}`, color: serviceStatusText }}
                        className='poppins task-card-container-label-bold status'
                    >
                        {oneServiceDesk.status}

                        {oneServiceDesk.status.toLowerCase() == "à fazer" ?
                            <AiOutlineClockCircle /> : <GiConfirmed />
                        }
                    </button>

                </div>
                <BsPencilFill className='task-card-container-card-title-icon' />
            </div>
        </div>
    )
}