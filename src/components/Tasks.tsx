import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import CreateTask from './CreateTask';
import TaskCard from './TaskCard';
import './Tasks.css'

export default function Tasks() {

    const { user } = useContext(AuthContext);

    return (
        <div className='tasks-container'>
            <CreateTask />
        </div>
    )
}