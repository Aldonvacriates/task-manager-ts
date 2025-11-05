import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const NavBar: React.FC = () => {

    return (
        <>
            <Navbar className='navbar bg-info text-dark gap-3'>
                <Navbar.Brand className='mx-4 fs-4' href='/'>Task App 2000</Navbar.Brand>
                <Nav className='mx-1 gap-1 my-1 fs-5'>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/tasks">Tasks</Nav.Link>
                </Nav>
            </Navbar>
        </>
    );
};

export default NavBar;


