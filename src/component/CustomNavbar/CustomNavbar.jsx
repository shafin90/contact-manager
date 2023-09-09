//  This is the Navbar at the top of the screen.

import { Button, Container, Form, Navbar } from "react-bootstrap";
import { FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';

const CustomNavbar = () => {
    return (
        <Container fluid className="px-0 mb-4">
            <Navbar className="bg-common-color">
                <Container fluid>
                    <Navbar.Brand className="text-white" href="#home">Contact</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Contacts"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button className="bg-white"> <FaArrowUp className="text-common-color" /> </Button>
                            <Button className="bg-white ms-2" > <FaArrowDown className="text-common-color" /> </Button>
                            <Button className="bg-white ms-2" > <FaPlus className="text-common-color" /> </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    );
};

export default CustomNavbar;