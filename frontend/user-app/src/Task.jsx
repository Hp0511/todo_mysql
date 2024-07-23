import React, { useState } from 'react';
import './Task.css';

function Task({ id, completed, task, date, importance, toggleImportance, completeUndo, editTask, editDate }) {
    const [isEditingTask, setIsEditingTask] = useState(false);
    const [isEditingDate, setIsEditingDate] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const [editedDate, setEditedDate] = useState(date);

    const handleToggleImportance = (event) => {
        const star = event.target;
        star.classList.toggle('fa-regular');
        star.classList.toggle('fa-solid');
        toggleImportance(id);
    };

    const handleCompleteUndo = () => {
        completeUndo(id);
    };

    const handleDoubleClickTask = () => {
        setIsEditingTask(true);
    };

    const handleDoubleClickDate = () => {
        setIsEditingDate(true);
    };

    const handleEditTask = () => {
        setIsEditingTask(false);
        editTask(id, editedTask);
    };

    const handleEditDate = () => {
        setIsEditingDate(false);
        console.log(editedDate);
        editDate(id, formatDate(editedDate));  
    };

    const handleInputChange = (event) => {
        setEditedTask(event.target.value);
    };

    const handleDateChange = (event) => {
        setEditedDate(event.target.value);
    };

    const handleKeyDownTask = (event) => {
        if (event.key === 'Enter') {
            handleEditTask();
        }
    };

    const handleKeyDownDate = (event) => {
        if (event.key === 'Enter') {
            handleEditDate();
        }
    };

    return (
        <tr className="taskrow" id={id}>
            <td className="cpbtarea">
                <div className={`cpbtcontent ${completed ? 'cptitle' : ''}`}>
                    {completed ? (
                        <i className="fa-solid fa-circle-check undo" onClick={handleCompleteUndo}></i>
                    ) : (
                        <>
                            <span className="material-symbols-outlined psCb" onClick={handleCompleteUndo}>
                                radio_button_unchecked
                            </span>
                            <span className="material-symbols-outlined cpBt" onClick={handleCompleteUndo}>check_circle</span>
                        </>
                    )}
                </div>
            </td>

            <td className="tasktitle">
                <div className="titlect" onDoubleClick={handleDoubleClickTask}>
                    {isEditingTask ? (
                        <input
                            type="text"
                            value={editedTask}
                            onChange={handleInputChange}
                            onBlur={handleEditTask}
                            onKeyDown={handleKeyDownTask}
                            autoFocus
                            className="editInput"
                        />
                    ) : (
                        <p task-id={id}>{task}</p>
                    )}
                    <span className="material-symbols-outlined infoIcon" title="Open details">
                        info
                    </span>
                </div>
            </td>
            
            <td className="duedate">
                <div className="duedatect" onDoubleClick={handleDoubleClickDate}>
                    {isEditingDate ? (
                        <input
                            type="date"
                            value={editedDate}
                            onChange={handleDateChange}
                            onBlur={handleEditDate}
                            onKeyDown={handleKeyDownDate}
                            autoFocus
                            className="editInput"
                        />
                    ) : (
                        <p>{date}</p>
                    )}
                    {/* <span className="material-symbols-outlined calIcon">
                        calendar_month
                    </span> */}
                </div>
            </td>
            
            <td className="impcb">
                <div className="starcontent" onClick={handleToggleImportance}>
                    {importance ? (
                        <i className="fa-solid fa-star imp1" title="Remove importance" />
                    ) : (
                        <i className="fa-regular fa-star imp1" title="Mark task as importance" />
                    )}
                </div>
            </td>
            <td name="non-select" />
        </tr>
    );
}

function formatDate(isoDate) {
    const dateObject = isoDate ? new Date(isoDate) : new Date();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const year = dateObject.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
}

export default Task;
