import React from 'react';
import './TaskContainer.css';
import Task from './Task.jsx';

function TaskCount({ count }) {
    return (
        <div className="cptask">
            <div className="showcp">
                <span className="material-symbols-outlined">arrow_drop_down</span>
                <strong>Completed</strong>
                <p id="cpTaskcount">{count}</p>
            </div>
        </div>
    );
}

function CpTaskContainer({ tasks, toggleImportance, completeUndo,editTask }) {
    return (
        <>
            <TaskCount count={tasks.length} />
            <div className="cptaskcontainer">
                <table className="task-table">
                    <tbody>
                        {tasks.map((task) => (
                            <Task
                                key={task.id}
                                completed={task.completed}
                                id={task.id}
                                task={task.task}
                                date={task.date}
                                importance={task.importance}
                                toggleImportance={toggleImportance}
                                completeUndo={completeUndo}
                                editTask={editTask}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default CpTaskContainer;
