import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import PageLayout from "../components/PageLayout";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";


const HomePage: React.FC = () => {

    const { isAuthenticated } = useAuth0();


    return (
        <>
            <PageLayout>
                <Container>
                    <div>
                        <h1 className="mb-4">Welcome!</h1>
                    </div>

                    {!isAuthenticated &&
                        <>
                            <div className="mb-4">
                                <p>Log in to get started!</p>
                            </div>
                            <LoginButton />
                        </>
                    }

                    {isAuthenticated &&
                        <>
                            <h4 className='mb-5'>Let's get started!</h4>
                            <div>
                                <Link to='/tasks'>
                                    <Button className="bg-info text-dark mb-5 border border-info">View Tasks</Button>
                                </Link>
                            </div>
                            <LogoutButton />
                        </>
                    }
                </Container>
            </PageLayout>
        </>
    );
};

export default HomePage;