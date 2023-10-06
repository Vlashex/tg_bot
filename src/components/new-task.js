import React, {useState} from 'react';
import {formatTime} from './formatTime'

const NewTask = (props) => {

    const [newTask, setNewTask] = useState({
        "id": 5,
        "content": "",
        "priority": '',
        "date": null,
        "status": false,
        "delegate_user_id": []
    })

    const [dateInputValue, setDateInputValue] = useState();
    const [timeInputValue, setTimeInputValue] = useState();

    const handleTextInputChange = (event) => {
        setNewTask({...newTask, content: event.target.value});
    };
    const handleDateInputChange = (event) => {
        setDateInputValue(event.target.value);
    }
    const handleTimeInputChange = (event) => {
        setTimeInputValue(event.target.value);
    };

    return (
        <div className="task-form-wrapper">
            <div onClick={() => {
                props.toggle()
            }} className="hiden-exit"/>
            <div className="task-form">
                <div className="task-form-inner">
                    <h6>Task</h6>
                    <input placeholder="enter the task" type="text" value={newTask.content}
                           onChange={handleTextInputChange} className="task-form-input"/>
                    <h6>Date</h6>
                    <input placeholder="choose a date" min={formatTime().slice(0, 10)} value={dateInputValue}
                           onChange={handleDateInputChange} type="date" className="task-form-input"/>
                    <h6>Time</h6>
                    <input placeholder="choose a date" value={timeInputValue} onChange={handleTimeInputChange}
                           type="time" className="task-form-input"/>
                    <h6>Priority</h6>
                    <div className="task-priority">
                        <button style={newTask.priority === 1 ? {background: "#2e545e"} : null} onClick={() => {
                            setNewTask({...newTask, priority: 1})
                        }}>Low
                        </button>
                        <button style={newTask.priority === 2 ? {background: "#2e545e"} : null} onClick={() => {
                            setNewTask({...newTask, priority: 2})
                        }}>Medium
                        </button>
                        <button style={newTask.priority === 3 ? {background: "#2e545e"} : null} onClick={() => {
                            setNewTask({...newTask, priority: 3})
                        }}>Hight
                        </button>
                    </div>
                </div>
                <button onClick={() => {
                    setNewTask({...newTask, date: `${dateInputValue} ${timeInputValue}`});
                    if (newTask.content !== '' && newTask.priority !== '' && newTask.date) {
                        props.setTaskList(taskList => [...taskList, newTask])
                        props.toggle()
                    } else alert('Check forms')
                }}>Send
                </button>
            </div>
        </div>
    );
};

export default NewTask;