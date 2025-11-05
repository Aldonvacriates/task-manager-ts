import React, { useState } from "react";
import { Card } from "react-bootstrap";
import type { Task } from '../models/Task.model';
import { useTask } from '../hooks/useTask'


const TaskCard: React.FC = () => {
    const { state, dispatch } = useTask()
    const [editTask, setEditTask] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const handleEditTask = (task: Task) => {
        setEditTask(task.id);
        setEditTitle(task.title)
        setEditDescription(task.description || '')
    };

    const handleSaveEdit = (task: Task) => {
        dispatch({
            type: "EDIT_TASK",
            payload: { ...task, title: editTitle, description: editDescription }
        })
        setEditTask(null);
    };

    const handleDeleteTask = (id: string) => {
        dispatch({
            type: "DELETE_TASK",
            payload: id,
        })
    };

    const handleTaskComplete = (id: string) => {
        dispatch({
            type: "TOGGLE_TASK_COMPLETE",
            payload: id,
        })
    };

    return (
        state.tasks.map((task) => (
            <Card style={{
                color: task.completed ? '#ff70f8ff' : undefined,
                backgroundColor: task.completed ? '#f8fffeff' : undefined
            }}
                className='mb-3 border border-info' key={task.id}>
                <Card.Body>
                    {editTask === task.id ? (
                        <form onSubmit={e => { e.preventDefault(); handleSaveEdit(task); }}>
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={editTitle}
                                onChange={e => setEditTitle(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={editDescription}
                                onChange={e => setEditDescription(e.target.value)}
                            />
                            <button type="submit" className='btn btn-outline-info btn-sm mx-1'>Save</button>
                            <button type="button" className='btn btn-outline-info btn-sm mx-1'
                                onClick={() => setEditTask(null)}>Cancel</button>
                        </form>
                    ) : (
                        <>
                            <Card.Title>
                                <h5>{task.title}</h5>
                            </Card.Title>

                            <Card.Text>
                                <p>{task.description}</p>
                            </Card.Text>

                            <button className='btn btn-outline-info btn-sm mx-1'
                                onClick={() => handleEditTask(task)}>&nbsp;&nbsp;Edit&nbsp;&nbsp;</button>

                            <button className='btn btn-outline-info btn-sm mx-1'
                                onClick={() => handleTaskComplete(task.id)}
                                style={{ color: task.completed ? '#ff70f8ff' : undefined }}>
                                {task.completed ? "Redo?" : "Complete?"}
                            </button>

                            <button className='btn btn-outline-info btn-sm mx-1'
                                onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        </>
                    )}
                </Card.Body>
            </Card>
        ))
    );
};

export default TaskCard;