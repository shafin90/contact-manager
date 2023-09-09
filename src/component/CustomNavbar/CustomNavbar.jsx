import { useState, useContext } from "react";
import { Button, Container, Form, Navbar, Modal } from "react-bootstrap";
import { FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';
import { authContext } from "../AuthProvider/AuthProvider";

const CustomNavbar = () => {
    const { name } = useContext(authContext);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        email: ""
    });

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddContact = () => {
        // You can perform actions like sending the data to an API here
        // For now, just log the data as an example
        console.log("Added contact:", formData);

        // Close the modal after adding the contact
        handleCloseModal();
    };

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
                            <Button className="bg-white ms-2"> <FaArrowDown className="text-common-color" /> </Button>
                            <Button className="bg-white ms-2" onClick={handleOpenModal}> <FaPlus className="text-common-color" /> </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="phoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddContact}>
                        Add Contact
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CustomNavbar;
