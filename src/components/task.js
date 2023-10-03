import React from 'react';
import './task.css'
const Task = () => {
    return (
        <div className="task-wrapper">
            <div className="task">
                <img src="" alt="img"/>
                <div className="task-inner">
                    <p>TextTextTextText TextTextText Text TextTextTextText TextTextTextText TextTextTextText TextTextText Text TextTextTextText TextTextTextText TextTextTextText TextTextText Text TextTextTextText TextTextTextText TextTextTextText TextTextText Text TextTextTextText TextTextTextText </p>
                    <input type="checkbox"/>
                </div>
            </div>
            <div className="task-buttons">
                <button>refactor</button>
                <button>delete</button>
            </div>
        </div>
    );
};

export default Task;