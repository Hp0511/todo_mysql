import React, { useEffect } from 'react';
import './TaskContainer.css';
import Task from './Task';

function addCellFocusListeners(cells) {
    cells.forEach((cell) => {
        cell.setAttribute('tabindex', '0');
        const handleFocus = () => {
            cell.style.outline = '0.5px solid black';
        };
        const handleBlur = () => {
            cell.style.outline = 'none';
        };
        cell.addEventListener('focus', handleFocus);
        cell.addEventListener('blur', handleBlur);

        cell._handleFocus = handleFocus;
        cell._handleBlur = handleBlur;
    });
}

function removeCellFocusListeners(cells) {
    cells.forEach((cell) => {
        if (cell._handleFocus) {
            cell.removeEventListener('focus', cell._handleFocus);
            cell.removeEventListener('blur', cell._handleBlur);
            delete cell._handleFocus;
            delete cell._handleBlur;
        }
    });
}

function TaskContainer({ tasks, editTask, completeUndo, toggleImportance, editDate }) {
    useEffect(() => {
        const cells = document.querySelectorAll('td:not([name="non-select"])');
        addCellFocusListeners(cells);

        return () => {
            removeCellFocusListeners(cells);
        };
    }, [tasks.length]);

    return (
        <div className="taskcontainer">
            <table className="task-table">
                <thead>
                    <tr className="taskrow">
                        <th />
                        <th className="taskcrit">Title</th>
                        <th className="taskcrit">Due Date</th>
                        <th className="taskcrit">Importance</th>
                        <th className="emptycol" />
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            completed = {task.completed}
                            id={task.id}
                            task={task.task}
                            date={task.date}
                            importance={task.importance}
                            toggleImportance={toggleImportance}
                            completeUndo={completeUndo}
                            editTask={editTask}
                            editDate = {editDate}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskContainer;
