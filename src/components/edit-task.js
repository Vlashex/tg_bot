import React, {useState} from 'react';


const EditTask = (props) => {

    //create a state that includes an object with values ​​for the edited task
    const [editTask, setEditTask] = useState({
        "task_id": props.task.task_id,
        "status": props.task.status,
        "content": props.task.content,
        "deadline_date": props.task.deadline_date,
        "priority": props.task.priority

    })

    const [dateInputValue, setDateInputValue] = useState();
    const [timeInputValue, setTimeInputValue] = useState();

    const handleDateInputChange = (event) => {
        setDateInputValue(event.target.value);
    }
    const handleTimeInputChange = (event) => {
        setTimeInputValue(event.target.value);
    };

    //create a function for sending edited task data to the database
    const postEditTask = () => {
        fetch(`${props.server_ip}tasks/EditTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editTask),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                props.getCreatedTasks()
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="task-form-wrapper">
            <div onClick={() => {
                props.toggle()
            }} className="hiden-exit"/>
            <div className="task-form">
                <div className="task-form-inner">
                    <h6>Task</h6>
                    <input placeholder="enter the task" type="text" value={editTask.content}
                           onChange={(event) => setEditTask({...editTask, content: event.target.value})}
                           className="task-form-input"/>
                    <h6>Date</h6>
                    <input placeholder="choose a date" defaultValue={editTask.deadline_date.slice(0, 10)}
                           value={dateInputValue}
                           onChange={handleDateInputChange} type="date" className="task-form-input"/>
                    <h6>Time</h6>
                    <input placeholder="choose a date" defaultValue={editTask.deadline_date.slice(11, 16)} type="time"
                           onChange={handleTimeInputChange} className="task-form-input"/>
                    <h6>Priority</h6>
                    <div className="task-priority">
                        <button style={editTask.priority === 1 ? {background: "#2e545e"} : null}
                                onClick={() => setEditTask({...editTask, priority: 1})}>Low
                        </button>
                        <button style={editTask.priority === 2 ? {background: "#2e545e"} : null}
                                onClick={() => setEditTask({...editTask, priority: 2})}>Medium
                        </button>
                        <button style={editTask.priority === 3 ? {background: "#2e545e"} : null}
                                onClick={() => setEditTask({...editTask, priority: 3})}>Hight
                        </button>
                    </div>
                </div>
                <button onClick={() => {
                    setEditTask({...editTask, date: `${dateInputValue} ${timeInputValue}`});
                    //call the function for sending edited task data to the database
                    postEditTask()
                    props.toggle()
                    }}>Send
                </button>
            </div>
        </div>
    );
};

export default EditTask;