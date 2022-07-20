import React, { Dispatch, useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext"
import TaskCard from "./TaskCard";
import './TaskSliderContainer.css'

interface ITaskSliderContainer {
    serviceDeskArray: any[];
    setDeletedSeviceDesk: Dispatch<React.SetStateAction<any>>
}

export default function TaskSliderContainer({ serviceDeskArray, setDeletedSeviceDesk }: ITaskSliderContainer) {

    const [toDo, setToDo] = useState<any[]>([]);
    const [doing, setDoing] = useState<any[]>([]);
    const [done, setDone] = useState<any[]>([]);
    useEffect(() => {
        let toDoElements: any[] = [];
        let doingElements: any[] = [];
        let doneElements: any[] = [];
        serviceDeskArray?.map(element => {
            if (element.status.toLowerCase() == "à fazer") {
                toDoElements.push(element);
                setToDo(toDoElements)
            }
            if (element.status.toLowerCase() == "fazendo") {
                doingElements.push(element);
                setToDo(doingElements)
            }
            if (element.status.toLowerCase() == "feito") {
                doneElements.push(element);
                setToDo(doneElements)
            }
        })
    }, serviceDeskArray)
    async function handlesetTaskDone() {
        await setTaskDone()
    }
    return (
        <div className="task-slider-container">
            <div className="task-slider-tasks-group">
                <div className="tasks-slider-tasks-group-header header-1">
                    <p>À fazer</p>
                </div>
                <div id="slider">
                    {toDo.map(element => (
                        <TaskCard key={element.id} setDeletedServiceDesk={setDeletedSeviceDesk} oneServiceDesk={element} />
                    ))}
                </div>
            </div>
            <div className="task-slider-tasks-group">
                <div className="tasks-slider-tasks-group-header header-2">
                    <p>Relizando</p>
                </div>
                <div id="slider">
                    {doing.map(element => (
                        <TaskCard key={element.id} setDeletedServiceDesk={setDeletedSeviceDesk} oneServiceDesk={element} />
                    ))}
                </div>

            </div>
            <div className="task-slider-tasks-group">
                <div className="tasks-slider-tasks-group-header header-3">
                    <p>Feito</p>
                </div>
                <div id="slider">
                    {done.map(element => (
                        <TaskCard key={element.id} setDeletedServiceDesk={setDeletedSeviceDesk} oneServiceDesk={element} />
                    ))}
                </div>
            </div>
        </div>
    )
}