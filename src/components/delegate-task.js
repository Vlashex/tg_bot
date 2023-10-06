import React, {useState} from 'react';
// import TelegramBot from 'node-telegram-bot-api';


// const bot = new TelegramBot('YOUR_BOT_TOKEN', { polling: false });

const DelegateTask = (props) => {


    const data = props.data

    const [A, setA] = useState(data.delegate_user_id)

    const [userImg, setUserImg] = useState([])

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


    const checkUserExists = async (username) => {
        setUserImg(userImg => [...userImg, {
            url: `https://t.me/i/userpic/320/${username}.jpg`,
            username: username,
            id: username
        }]);
    };


    return (
        <div className="task-form-wrapper">
            <div onClick={() => {
                props.toggle()
            }} className="hiden-exit"/>
            <div className="task-form">
                <div className="task-form-inner">
                    {
                        userImg.map((element) => {
                            const ID = element.id
                            return (
                                <div key={element.username} className="user">
                                    <img src={element.url} alt="IMG"/>
                                    <p>{element.username}</p>
                                    <button onClick={() => {
                                        setUserImg(userImg.filter((element) => {
                                            return element.id !== ID
                                        }))
                                    }}>Del
                                    </button>
                                </div>
                            )
                        })
                    }
                    <div className="user">
                        <input value={inputValue} onChange={handleInputChange} placeholder="username" type="text"/>
                        <button onClick={() => {
                            if (inputValue !== '') {
                                checkUserExists(inputValue)
                            }
                            setInputValue('')
                        }}>Add
                        </button>
                    </div>
                </div>
                <button onClick={() => {
                    props.setTaskList(props.taskList.map((element) => {
                        if (element.id === props.currentTaskId) {
                            return {...data, delegate_user_id: A}
                        } else return element
                    }));
                    props.toggle()
                }}>Send
                </button>
            </div>
        </div>
    );
};

export default DelegateTask;