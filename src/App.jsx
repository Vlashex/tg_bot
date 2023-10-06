import './App.css';
import './user-list.css'
import Task from './components/task'
import {useThemeParams} from '@vkruglikov/react-telegram-web-app';
import React, {useState} from 'react'
import NewTask from "./components/new-task";
import EditTask from "./components/edit-task";
import DelegateTask from "./components/delegate-task";
import dataBase from './bd.json'

function App() {

    const db = dataBase

    const currentUserName = 'XZ7kto'

    let userId = 0
    db.users.forEach((element)=>{
        if (element.username === currentUserName){userId = element.id}
    })


    const [themeParams] = useThemeParams();

    const [taskList, setTaskList] = useState(db.tasks)

    const [sortedTaskList, setSortedTaskList] = useState(taskList)

    const [isNewTask, setNewTask] = useState(false);

    const [isEditTask, setEditTask] = useState(false);

    const [isImageVisible, setImageVisibility] = useState(false)

    const [whatTabSelected, setSelectedTab] = useState(1)

    const [currentTaskId, choseTask] = useState(null)

    const [isDelegateTask, setDelegateTask] = useState(false)

    const [isTaskButton, setTaskButton] = useState(true)

    return (
        <div className="App">
            <div className="wrapper">
                <div className="task-group">
                    <div className="button-wrapper">
                        <button style={whatTabSelected === 1 ? {color: themeParams.link_color || 'red'} : null}
                                onClick={() => {
                                    setSelectedTab(1)
                                    setImageVisibility(false)
                                    setTaskButton(true)
                                    setSortedTaskList(taskList.map((element) => {
                                        return element
                                    }))
                                }}>Created
                        </button>
                        <div style={whatTabSelected === 1 ? {background: themeParams.link_color || 'red'} : null}
                             className="half-sausage"/>
                    </div>
                    <div className="button-wrapper">
                        <button style={whatTabSelected === 2 ? {color: themeParams.link_color || 'red'} : null}
                                onClick={() => {
                                    setSelectedTab(2)
                                    setImageVisibility(true)
                                    setTaskButton(false)
                                    setSortedTaskList(taskList.filter((element) => {
                                        return element.create_id === userId
                                    }))
                                }}>Delegated
                        </button>
                        <div style={whatTabSelected === 2 ? {background: themeParams.link_color || 'red'} : null}
                             className="half-sausage"/>
                    </div>
                    <div className="button-wrapper">
                        <button style={whatTabSelected === 3 ? {color: themeParams.link_color || 'red'} : null}
                                onClick={() => {
                                    setSelectedTab(3)
                                    setImageVisibility(true)
                                    setTaskButton(false)

                                    setSortedTaskList(taskList.filter((element) => {
                                        return element.create_id !== userId
                                    }))
                                }}>Received
                        </button>
                        <div style={whatTabSelected === 3 ? {background: themeParams.link_color || 'red'} : null}
                             className="half-sausage"/>
                    </div>
                </div>
                <div style={{background: themeParams.bg_color || '#222'}}>
                    <div className="task-list">
                        {
                            taskList.map((element) => {
                                return (<Task
                                    key={element.id}
                                    data={element}
                                    isImageVisible={isImageVisible}
                                    toggleEdit={() => {
                                        setEditTask(!isEditTask)
                                    }}
                                    toggleDelegate={() => {
                                        setDelegateTask(!isDelegateTask)
                                    }}
                                    choseTask={choseTask}
                                    setTaskList={setTaskList}
                                    taskList={taskList}
                                    currentTaskId={currentTaskId}
                                    isTaskButton={isTaskButton}
                                />)
                            })
                        }
                    </div>


                    {isNewTask ? <NewTask
                        toggle={() => {
                            setNewTask(!isNewTask)
                        }}
                        setTaskList={setTaskList}
                        taskList={taskList}

                    /> : null}

                    {isEditTask ? <EditTask
                        data={taskList.filter((element) => {
                            return element.id === currentTaskId;
                        })[0]}
                        toggle={() => setEditTask(!isEditTask)}
                        setTaskList={setTaskList}
                        currentTaskId={currentTaskId}
                        taskList={taskList}
                    /> : null}


                    {isDelegateTask ? <DelegateTask
                        data={taskList.filter((element) => {
                            return element.id === currentTaskId;
                        })[0]}
                        toggle={() => setDelegateTask(!isDelegateTask)}
                        taskList={taskList}
                        setTaskList={setTaskList}
                        currentTaskId={currentTaskId}
                    /> : null}


                    {isTaskButton?<button onClick={() => setNewTask(!isNewTask)} className="send-button">New task</button>:null}


                </div>
            </div>
        </div>
    );
}


export default App