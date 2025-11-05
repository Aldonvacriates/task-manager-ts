// "dashboard" shows task form and task list if logged in
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import PageLayout from "../components/PageLayout";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

const Tasks: React.FC = () => {
    const { isAuthenticated } = useAuth0();

    if (!isAuthenticated)
        return (
            <>
                <PageLayout>
                    <div>
                        <h2 className="mb-5">Must log in to view tasks!</h2>
                        <LoginButton />
                    </div>
                </PageLayout>
            </>
        )

    return (
        <PageLayout>
            <div className="mb-5">
                <h1 className="mb-3">Let's get started!</h1>
                <h2 className="mb-5">What do you want to do today?</h2>
                <TaskForm />
                <TaskList />
            </div>
            <LogoutButton />
        </PageLayout>
    );
};

export default Tasks;
