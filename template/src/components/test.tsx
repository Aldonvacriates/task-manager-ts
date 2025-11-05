import { useContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import TaskContext from "../context/TaskContext"


const Test = () => {
    const { state, dispatch } = useContext(TaskContext);
    const [test, setTest] = useState('')

    const handleAddTask = (
        test: string,
    ) => {
        dispatch({
            type: 'ADD_TASK', payload: {
                id: uuidv4(),
                title: test,
            }
        })
    }


    return (
        <>
            <input type="text"
                value={test}
                onChange={(e) => setTest(e.target.value)}
            />
            <button onClick={() => handleAddTask(test)}>add</button>
            <ul>
                {state.tasks.map(task => (
                    <li key={task.id}>
                        <p>{task.title}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Test;