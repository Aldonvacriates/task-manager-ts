import { useAuth0 } from "@auth0/auth0-react";
import PageLayout from "../components/PageLayout";

const CallbackPage: React.FC = () => {

    const { error } = useAuth0();

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    return (
        <PageLayout>
            <h1>Logging in...</h1>
        </PageLayout>
    );
};
export default CallbackPage;