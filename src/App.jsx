import './App.css';
import './user-list.css'
import Task from './components/task'
import {useThemeParams} from '@vkruglikov/react-telegram-web-app';
import React, {useState, useEffect} from 'react'
import NewTask from "./components/new-task";
import EditTask from "./components/edit-task";
import DelegateTask from "./components/delegate-task";
import { useTelegram } from "lib/TelegramProvider";

function App() {

    const currentUserName = window.Telegram.WebApp.initData.username || 'user1'

    const getCreatedTasksFunction = async () => {
        fetch(`http://127.0.0.1:8000/tasks/CreatedTask/?username=${currentUserName}`)
            .then(data => setCreatedTasks(data))
    }
    const getDelegatedTasksFunction = async () => {
        fetch(`http://127.0.0.1:8000/tasks/DelegatedTasks/?username=${currentUserName}`)
            .then(data => setReceivedTasks(data))
    }
    const getReceivedTasksFunction = async () => {
        fetch(`http://127.0.0.1:8000/tasks/ReceivedTasks/?username=${currentUserName}`)
            .then(data => setDelegatedTasks(data))
    }
    const setNewUserFunction = async () => {
        fetch(`http://127.0.0.1:8000/users/Create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentUserName)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }

    const { webApp } = useTelegram();
    const [isFirstOpening, setIsFirstOpening] = useState(true);

    useEffect(() => {
        if (isFirstOpening && webApp) {
            setIsFirstOpening(false);
            setNewUserFunction()
        }
    }, [webApp, isFirstOpening]);

    const [themeParams] = useThemeParams();

    const [createdTasks, setCreatedTasks] = useState(getCreatedTasksFunction())

    const [receivedTasks, setReceivedTasks] = useState(getDelegatedTasksFunction())

    const [delegatedTasks, setDelegatedTasks] = useState(getReceivedTasksFunction())


    const [isNewTask, setNewTask] = useState(false);

    const [isEditTask, setEditTask] = useState(false);

    const [whatTabSelected, setSelectedTab] = useState(1)

    const [isDelegateTask, setDelegateTask] = useState(false)

    const [isTaskButton, setTaskButton] = useState(true)

    const [chosenTasksId, setChosenTaskId] = useState('')


    const renderTast = (element, isImgVisible) => {
        return (<Task
            key={element.task_id}
            task={element}
            isImageVisible={true}
            chosenTasksId={chosenTasksId}
            isTaskButton={isTaskButton}

            choseTask={setChosenTaskId}
            whatTabSelected={whatTabSelected}

            toggleEdit={() => setEditTask(!isEditTask)}
            toggleDelegate={() => setDelegateTask(!isDelegateTask)}
            setTaskButton={()=>setTaskButton(!isTaskButton)}
            getCreatedTasks={()=>getCreatedTasksFunction()}


        />)
    }


    return (
        <div className="App">
            <div className="wrapper">
                <div className="task-group">
                    <div className="button-wrapper">
                        <button style={whatTabSelected === 1 ? {color: themeParams.link_color || 'red'} : null}
                                onClick={() => {
                                    setSelectedTab(1)
                                }}>Created
                        </button>
                        <div style={whatTabSelected === 1 ? {background: themeParams.link_color || 'red'} : null}
                             className="half-sausage"/>
                    </div>
                    <div className="button-wrapper">
                        <button style={whatTabSelected === 2 ? {color: themeParams.link_color || 'red'} : null}
                                onClick={() => {
                                    setSelectedTab(2)
                                }}>Delegated
                        </button>
                        <div style={whatTabSelected === 2 ? {background: themeParams.link_color || 'red'} : null}
                             className="half-sausage"/>
                    </div>
                    <div className="button-wrapper">
                        <button style={whatTabSelected === 3 ? {color: themeParams.link_color || 'red'} : null}
                                onClick={() => {
                                    setSelectedTab(3)
                                }}>Received
                        </button>
                        <div style={whatTabSelected === 3 ? {background: themeParams.link_color || 'red'} : null}
                             className="half-sausage"/>
                    </div>
                </div>
                <div>
                    <div className="task-list">
                        {
                            whatTabSelected === 1 ? createdTasks.map((element) => renderTast(element, false)) : null
                        }
                        {
                            whatTabSelected === 2 ? delegatedTasks.map((element) => renderTast(element, true)) : null
                        }
                        {
                            whatTabSelected === 3 ? receivedTasks.map((element) => renderTast(element, true)) : null
                        }
                    </div>

                    {isNewTask ? <NewTask
                        toggle={() => setNewTask(!isNewTask)}
                        getCreatedTasks={()=>getCreatedTasksFunction()}
                        Id={chosenTasksId}
                        username={currentUserName}
                    /> : null}

                    {isEditTask ? <EditTask
                        toggle={() => setEditTask(!isEditTask)}
                        Id={chosenTasksId}
                        getCreatedTasks={()=>getCreatedTasksFunction()}
                        task={createdTasks.filter((element)=>{return element.id===chosenTasksId})}


                    /> : null}


                    {isDelegateTask ? <DelegateTask
                        Id={chosenTasksId}
                        getCreatedTasks={()=>getCreatedTasksFunction()}
                        getDelegatedTasks={()=>getDelegatedTasksFunction()}
                        username={
                            createdTasks.filter((element)=>{return element.id===chosenTasksId}).delegated_to_username
                        }
                    /> : null}


                    {isTaskButton ?
                        <button onClick={() => setNewTask(!isNewTask)} className="send-button">New task</button> : null}


                </div>
            </div>
        </div>
    );
}


export default App