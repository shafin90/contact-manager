import { useState, useContext, useEffect } from "react";
import { Button, Container, Form, Navbar, Modal } from "react-bootstrap";
import { FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';
import { authContext } from "../AuthProvider/AuthProvider";

const CustomNavbar = () => {
    const { reload, setReload, setAllContacts, allContacts } = useContext(authContext);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        email: ""
    });
    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        let searchTextLength = searchText.length;
        if(searchTextLength!==0){
            const newContacts = allContacts.filter(e=>e.name==searchText);
        setAllContacts(newContacts);
        setReload(!reload)
        }
    },[searchText, allContacts, setAllContacts, reload, setReload])


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

        // Create a new Date object
        const currentDate = new Date();

        // Get the current date components
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
        const year = currentDate.getFullYear();
    
        // Create a formatted date string
        const formattedDate = `${day}/${month}/${year}`;
    

    const handleAddContact = () => {
        // Create an object with the form data
        const contactData = {
            name: formData.name,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            date : formattedDate
        };

        // Send the data to the server using the fetch API with the POST method
        fetch("https://contact-manager-server-sc28.vercel.app/api/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the server if needed
                console.log("Server response:", data);

                // Close the modal after adding the contact
                handleCloseModal();

                // Change the value of reload state so that, the useEffect to fetch data in authprovider fetch the data again.
                setReload(!reload);
            })
            .catch((error) => {
                // Handle errors if the request fails
                console.error("Error:", error);
            });
    };



    const handleSortAscending = () => {
        const sortedContacts = [...allContacts].sort((a, b) => {
            return a.name.length - b.name.length;
        });
        setAllContacts(sortedContacts);
    };

    const handleSortDescending = () => {
        const sortedContacts = [...allContacts].sort((a, b) => {
            return b.name.length - a.name.length;
        });
        setAllContacts(sortedContacts);
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

                                onChange={e => setSearchText(e.target.value)}
                            />
                            {/* Arrow up button */}
                            <Button onClick={handleSortAscending} className="bg-white"> <FaArrowUp className="text-common-color" /> </Button>
                            {/* Arrow down button */}
                            <Button onClick={handleSortDescending} className="bg-white ms-2"> <FaArrowDown className="text-common-color" /> </Button>
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
