import React from "react";
import { useTask } from "../hooks/useTask";
import TaskCard from "./TaskCard";


const TaskList: React.FC = () => {
    const { state } = useTask();

    return (
        <>
            {state.tasks.length === 0 ? (
                <h4>No tasks yet</h4>
            ) : (
                <TaskCard />
            )}
        </>
    );
};

export default TaskList;




