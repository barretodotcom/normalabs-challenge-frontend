import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import './MyTasks.css'

export default function MyTasks() {

    const { user } = useContext(AuthContext);

    return (
        <div className="my-tasks-container">

        </div>
    )
}