import React, { Dispatch, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { FaTasks } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';
import { AiFillDelete, AiOutlineClockCircle, AiTwotoneCalendar } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi'
import { BiDetail } from 'react-icons/BI'
import './TaskCard.css';
import { MdDateRange } from 'react-icons/md';
import { IoMdTime } from 'react-icons/io';

interface ITaskCard {
    oneServiceDesk: any;
    setDeletedServiceDesk: Dispatch<React.SetStateAction<any>>;
    setTaskDone: (taskId: string) => Promise<void>
}

export default function TaskCard({ oneServiceDesk, setDeletedServiceDesk }: ITaskCard) {

    const { serviceDesk, setTaskStatus } = useContext(AuthContext)

    const initialDate = new Date(oneServiceDesk.initialDate);
    const finalDate = new Date(oneServiceDesk.finalDate);
    const serviceStatusColor = oneServiceDesk.status.toLowerCase() == "à fazer" ? "#ffdf51" : oneServiceDesk.status.toLowerCase() == 'feito' ? "rgb(141, 241, 118)" : "rgb(106, 163, 236)";
    const serviceStatusBorder = oneServiceDesk.status.toLowerCase() == "à fazer" ? "#e0b700" : oneServiceDesk.status.toLowerCase() == 'feito' ? "rgb(141, 241, 118)" : "rgb(106, 163, 236)";
    const serviceStatusText = oneServiceDesk.status.toLowerCase() == "à fazer" ? "#d3ac00" : oneServiceDesk.status.toLowerCase() == 'feito' ? "rgb(141, 241, 118)" : "rgb(106, 163, 236)";
    async function handlesetTaskDone(element: any, status: string) {
        await setTaskStatus(element.id, status);
    }
    return (
        <div style={{ borderTop: `3.5px solid ${serviceStatusColor}` }} className="task-card-container card-shadow">
            <div className='task-card-container-card-title'>
                <h1 className='poppins'>Tarefa Nº {(serviceDesk?.indexOf(oneServiceDesk) as number) + 1}</h1>
                <AiFillDelete
                    cursor={"pointer"}
                    onClick={() => setDeletedServiceDesk(oneServiceDesk)}
                    className='task-card-container-card-title-icon-delete'
                />
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
                    <p className='poppins task-card-container-label-bold task-card-details'>{oneServiceDesk.details}</p>
                </div>
                <BiDetail className='task-card-container-card-title-icon' />

            </div>

            <div className="task-card-container-card-title">
                <div className="task-card-container-card-title-labels">
                    <p className='poppins task-card-container-label-title'>Data inicial</p>
                    <p className='poppins task-card-container-label-bold'>{`${initialDate.getDate().toString().padStart(2, "0")}/${(initialDate.getMonth() + 1).toString().padStart(2, "0")}/${initialDate.getFullYear()}`}</p>
                </div>
                <MdDateRange className='task-card-container-card-title-icon' />
            </div>

            <div className="task-card-container-card-title">
                <div className="task-card-container-card-title-labels">
                    <p className='poppins task-card-container-label-title'>Data final</p>
                    <p className='poppins task-card-container-label-bold'>
                        {`${finalDate.getDate().toString().padStart(2, "0")}/${(finalDate.getMonth() + 1).toString().padStart(2, "0")}/${finalDate.getFullYear()}`}
                    </p>
                </div>
                <AiTwotoneCalendar className='task-card-container-card-title-icon' />
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
                    {oneServiceDesk.status.toLowerCase() == "fazendo" &&
                        <p onClick={() => handlesetTaskDone(oneServiceDesk.id, "Feito")} className='poppins done-button'>Marcar como feito.</p>
                    }

                </div>
                <IoMdTime className='task-card-container-card-title-icon' />
            </div>
        </div>
    )
}