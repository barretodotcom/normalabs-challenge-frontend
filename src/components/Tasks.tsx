import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import CreateTask from './CreateTask';
import TaskCard from './TaskCard';
import './Tasks.css'

export default function Tasks() {

    const { user } = useContext(AuthContext);

    return (
        <div className='tasks-container'>
            {user.serviceDesk.length ?
                <TaskCard oneServiceDesk={user.serviceDesk[user.serviceDesk.length - 1]} />
                :
                <CreateTask />
            }
        </div>
    )
}