import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import TaskCard from '../../components/TaskCard';
import Tasks from '../../components/Tasks';
import { AuthContext } from '../../context/authContext';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

import './Profile.css'
import DeleteTaskBox from '../../components/DeleteTaskBox';

export default function Profile() {

    const { user, signOut, serviceDesk } = useContext(AuthContext);
    const [deletedServiceDesk, setDeletedServiceDesk] = useState(undefined);

    if (!user) {
        return (
            <div className='not-signed'>
                <p className='poppins not-signed-label'>Você precisa estar logado para acessar esta página.</p>
            </div>
        )
    }

    function slideLeft() {
        let slider = document.getElementById("slider") as HTMLElement;
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    function slideRight() {
        let slider = document.getElementById("slider") as HTMLElement;
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    return (
        <div className="profile-container">
            <div className='welcome-container'>
                <h1 className='poppins welcome-label'>Seja bem vindo, {user.name}!</h1>
            </div>
            <div className='profile-card'>
                <Card />
                <Tasks />
            </div>
            {serviceDesk && (serviceDesk as []).length > 0 ?
                <div className='profile-all-tasks'>
                    <div className='profile-all-tasks-title'>
                        <h1 className='poppins'>Todas as suas tarefas:</h1>
                    </div>
                    <div className='profile-all-tasks-generator'>
                        <div className='clicker' >
                            <MdChevronLeft cursor={"pointer"} onClick={slideLeft} size={40} />
                        </div>

                        <div id="slider" className='profile-all-tasks-list'>
                            {serviceDesk?.reverse().map((element, index) => (
                                <TaskCard setDeletedServiceDesk={setDeletedServiceDesk} key={index} oneServiceDesk={element} />
                            ))}
                        </div>

                        <div className='clicker'>
                            <MdChevronRight cursor={"pointer"} onClick={slideRight} size={40} />
                        </div>
                    </div>

                </div> : null
            }
            <DeleteTaskBox setDeletedServiceDesk={setDeletedServiceDesk} deletedServiceDesk={deletedServiceDesk} />

        </div>
    )
}