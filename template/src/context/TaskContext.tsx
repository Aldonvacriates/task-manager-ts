import { createContext, type Dispatch, type ReactNode, useReducer } from "react";
import type { Task, TaskAction } from "../models/Task.model";

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: []
}

const TaskContext = createContext<{
    state: TaskState,
    dispatch: Dispatch<TaskAction>
}>({
    state: initialState,
    dispatch: () => null,
})



const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case "ADD_TASK":
            return { tasks: [...state.tasks, action.payload] };
        case "EDIT_TASK":
            return {
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                )
            };
        case "DELETE_TASK":
            return { tasks: state.tasks.filter((task) => task.id !== action.payload) };
        case "TOGGLE_TASK_COMPLETE":
            return {
                tasks: state.tasks.map((task) =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                )
            };
        default:
            return state;

    }
};


export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState)

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext;


//use reducer sets the SHAPE of the state, with a function
//that uses actions to change the state. actions are objects
//with a type and a payload (data to change the state with)
//the reducer function takes the current state and an action
//and returns a new state based on the action type
//the context provider wraps the app and provides the state
//and dispatch function to the components that need it


