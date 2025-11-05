import React, { useState } from "react";
import { Button, Container, Form, Col } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
import type { Task } from "../models/Task.model";
import { useTask } from "../hooks/useTask"


const TaskForm: React.FC = () => {
    const { dispatch } = useTask();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Task = {
            id: uuidv4(),
            title,
            description,
            completed: false,
        };
        dispatch({ type: "ADD_TASK", payload: newTask });
        setTitle("");
        setDescription("");
    };


    return (
        <Container className="mb-3">
            <Col>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 px-5">
                        <Form.Control className="border border-info"
                            type="text"
                            placeholder="enter task"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 px-5">
                        <Form.Control className="border border-info"
                            type="text"
                            placeholder="enter task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Button className='bg-info text-dark my-3 border border-info' type="submit">Add</Button>
                </Form>
            </Col>
        </Container >
    );
};

export default TaskForm;