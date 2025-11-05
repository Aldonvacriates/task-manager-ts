import React from "react";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";

type PageLayoutProps = {
    children?: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {

    return (
        <>
            <NavBar />
            <Container className="d-flex justify-content-center text-center p-4 mt-5">
                <div>
                    {children}
                </div>
            </Container>
        </>
    );
};

export default PageLayout;