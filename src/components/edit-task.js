import React, {useState} from 'react';


const EditTask = (props) => {

    const [editTask, setEditTask] = useState(props.data)

    const [dateInputValue, setDateInputValue] = useState();
    const [timeInputValue, setTimeInputValue] = useState();

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
                    <input placeholder="enter the task" type="text" value={editTask.content}
                           onChange={(event) => setEditTask({...editTask, content: event.target.value})}
                           className="task-form-input"/>
                    <h6>Date</h6>
                    <input placeholder="choose a date" defaultValue={editTask.assigned_date.slice(0, 10)} value={dateInputValue}
                           onChange={handleDateInputChange} type="date" className="task-form-input"/>
                    <h6>Time</h6>
                    <input placeholder="choose a date" defaultValue={editTask.assigned_date.slice(11, 16)} type="time"
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
                    if (editTask.content !== '' && editTask.priority !== '' && editTask.date) {

                        props.setTaskList(props.taskList.map((element) => {
                            if (element.id === props.currentTaskId) {
                                return editTask
                            } else {
                                return element
                            }
                        }))
                        props.toggle()
                    } else alert('Check forms')
                }}>Send
                </button>
            </div>
        </div>
    );
};

export default EditTask;