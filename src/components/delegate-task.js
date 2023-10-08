import React, {useState} from 'react';

const DelegateTask = (props) => {


    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const postDelegateToUsername = (name) => {
        fetch(`http://127.0.0.1:8000/tasks/DelegateToUsername/?task_id=${props.Id}&username=${name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(name),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }



    return (
        <div className="task-form-wrapper">
            <div onClick={() => {
                props.toggle()
            }} className="hiden-exit"/>
            <div className="task-form">
                <div className="task-form-inner">
                    <div className="user">
                        <img src={`https://t.me/i/userpic/320/${inputValue}.jpg`} alt="IMG"/>
                        <input value={inputValue} onChange={handleInputChange} placeholder="username" type="text"/>
                    </div>
                </div>
                <button onClick={() => {
                    postDelegateToUsername([...props.task.username, inputValue])
                    props.getCreatedTasks()
                    props.getDelegatedTasks()
                    props.toggle()
                }}>Send
                </button>
            </div>
        </div>
    );
};

export default DelegateTask;