import React from 'react';
import './task.css'
import {exactTime} from "./formatTime";

const Task = (props) => {

    const A = (
        <div className="task-buttons">
            <button onClick={() => {
                props.toggleEdit()
            }}>Edit
            </button>
            <button onClick={() => props.toggleDelegate()}>Delegate</button>
            <button onClick={() => {
                props.setTaskList(props.taskList.filter((element) => {
                    return element.id !== props.data.id;
                }))
            }}>Delete
            </button>
        </div>)

    return (
        <div className="task">
            <div className="task-inner">
                {props.isImageVisible ? <img src="" alt=""/> : null}
                <div className="task-priority"/>
                <div>
                    <div>
                        <p>{
                            exactTime(props.data.assigned_date)
                        }</p>
                        <div onClick={() => {
                            props.setTaskList(props.taskList.map((element)=>{
                                if (element.id === props.data.id){
                                    return {...element, status: !props.data.status}
                                } else { return element }
                            }))
                        }} style={props.data.status?{background: "#79C063"} : null} className="task-check-box"/>
                    </div>
                    <p onClick={() => {
                        props.currentTaskId === props.data.id ? props.choseTask(null) : props.choseTask(props.data.id)
                    }}> {props.data.content || '404 Task content loading error'} </p>
                </div>
            </div>
            {
                (props.currentTaskId === props.data.id)&&props.isTaskButton ? A : null
            }
        </div>
    );
};

export default Task;

