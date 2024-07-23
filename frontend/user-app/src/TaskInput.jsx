import React, { useState,useEffect } from 'react';
import './TaskInput.css';

function Inputholder({ value, onInputChange, onAddTask }) {
    return (
        <div className="inputholder">
            <div className="smallTaskbutton">
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                    radio_button_unchecked
                </span>
            </div>
            <input
                type="text"
                placeholder="Add a task"
                id="taskinput"
                value={value}
                onChange={onInputChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        onAddTask();
                    }
                }}
            />
        </div>
    );
}

function AddButton({ inputValue, onAddTask }) {
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (inputValue !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [inputValue]);

    return (
        <button
            className="addbutton"
            id="addButton"
            disabled={disabled}
            style={{
                color: disabled ? "gray" : "blue",
                cursor: disabled ? "not-allowed" : "pointer"
            }}
            onClick={onAddTask}
        >
            Add
        </button>
    );
}

function TaskButton({ title, name }) {
    return (
        <button className="funcBtn" title={title}>
            <span className="material-symbols-outlined">{name}</span>
        </button>
    );
}

function TaskInput({ addTask }) {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddTask = () => {
        if (inputValue.trim() !== "") {
            addTask(inputValue);
            setInputValue("");
        }
    };

    return (
        <div className="Task">
            <Inputholder value={inputValue} onInputChange={handleInputChange} onAddTask={handleAddTask} />
            <div className="taskBtn">
                <div className="lefttaskBtn">
                    <TaskButton title="Add due date" name="calendar_month" />
                    <TaskButton title="Remind me" name="notifications" />
                    <TaskButton title="Repeat" name="repeat" />
                </div>
                <div className="righttaskBtn">
                    <AddButton inputValue={inputValue} onAddTask={handleAddTask} />
                </div>
            </div>
        </div>
    );
}

export default TaskInput;
