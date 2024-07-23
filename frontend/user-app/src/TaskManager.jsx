import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskContainer from './TaskContainer';
import CpTaskContainer from './CpTaskContainer';

const BASE_URL = 'http://localhost:3000';
const ENDPOINT = {
    // ALL_TASKS: `${BASE_URL}/api/tasks`
    TASKS: {
        LIST: `${BASE_URL}/api/tasks`,
        BY_ID: `${BASE_URL}/api/tasks/`,
        CREATE: `${BASE_URL}/api/tasks`,
        COMPLETE_LIST: `${BASE_URL}/api/tasks/complete-list`,
    },
}

function TaskManager() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(ENDPOINT.TASKS.LIST);
                const data = await response.json();
                const sortedData = data.sort((a, b) => b.importance - a.importance);
                console.log(sortedData);
                setTasks(sortedData);
            } catch (error) {
                console.error('Failed to fetch tasks', error);
            }
        };
        fetchTasks();
    }, []);

    const addTask = async (taskName) => {
        const newTask = {
            task: taskName
        };
        try {
            console.log(ENDPOINT.TASKS.CREATE);
            const response = await fetch(ENDPOINT.TASKS.CREATE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            });
            const addedTask = await response.json();
            console.log("Added new task", addedTask);
            setTasks([...tasks, addedTask]);
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    const completeUndo = async(taskId) => {
        const updatedTasks = tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);

        const newTask = updatedTasks.find(task => task.id === taskId);
        updateTaskData({ completed: newTask.completed },taskId);
    };

    const editTask = async(taskId, newTaskName) => {
        const updatedTasks = tasks.map(task => 
            task.id === taskId ? { ...task, task: newTaskName } : task
        );
        setTasks(updatedTasks);
        updateTaskData({task:newTaskName},taskId);
    };

    const editDate = async(taskId, newDate) => {
        const updatedTasks = tasks.map(task => 
            task.id === taskId ? { ...task, date: newDate } : task
        );
        setTasks(updatedTasks);
        updateTaskData({date:newDate},taskId);
    };

    const toggleImportance = async(taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, importance: !task.importance } : task
        );
        updatedTasks.sort((a, b) => b.importance - a.importance);
        setTasks(updatedTasks);

        const newTask = updatedTasks.find(task => task.id === taskId);
        updateTaskData({ importance: newTask.importance },taskId);
    };

    const updateTaskData = async(payload,taskId) => {
        try {
            const url = `${ENDPOINT.TASKS.BY_ID}${taskId}`;
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const updatedTask = await response.json();
            console.log("Task Updated successfully", updatedTask);
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    }

    const incompleteTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <>
            <TaskInput addTask={addTask} />
            <TaskContainer tasks={incompleteTasks} completeUndo={completeUndo} editTask={editTask} editDate={editDate} toggleImportance={toggleImportance}/>
            <CpTaskContainer tasks={completedTasks} completeUndo={completeUndo} editTask={editTask} editDate={editDate} toggleImportance={toggleImportance}  />
        </>
    );
}

export default TaskManager;
