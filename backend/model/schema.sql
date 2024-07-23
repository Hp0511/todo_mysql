CREATE DATABASE todolist;
USE todolist;

CREATE TABLE tasks (
    id VARCHAR(255) PRIMARY KEY,
    task TEXT NOT NULL,
    date VARCHAR(255),
    importance BOOLEAN,
    completed BOOLEAN
);

-- INSERT INTO tasks (id, task, created, importance, completed)
-- VALUES (0, 'Task details here', '2024-02-02', FALSE, FALSE);

INSERT INTO tasks (id, task, date, importance, completed)
VALUES (1, 'say hi', '07/19/2024', FALSE, FALSE);
