import { Container, Table, Dropdown, DropdownButton, Modal, Form, Button } from "react-bootstrap";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { IoCallOutline } from 'react-icons/io5';
import './ContactTable.css';
import { useContext, useState } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import { GrDocumentUpdate } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';

const ContactTable = () => {
    const { allContacts, setAllContacts, setReload, reload } = useContext(authContext);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [close, setClose] = useState(true);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [id, setId] = useState('');

    const handleDeleteContact = (e) => {
        console.log(e._id)
        fetch(`http://localhost:5000/api/contacts/${e._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    // alert('deleted successfully');
                    const remaining = allContacts.filter(contacts => contacts._id !== e._id);
                    setAllContacts(remaining);
                }
            })

    }



    const handleOpenMenu = (contact) => {
        setSelectedContact(contact);
        setShowMenu(true);
    };
    const handleCloseMenu = () => {
        setSelectedContact(null);
        setShowMenu(false);
    };

    const handleUpdateContact = (event) => {
        // Open the update modal
        setShowUpdateModal(true);

        // setting the id
        setId(event._id);

        // Pre-fill the form with the current contact details
        setUpdatedName(selectedContact.name);
        setUpdatedPhoneNumber(selectedContact.phoneNumber);
        setUpdatedEmail(selectedContact.email);
    };

    const handleCloseUpdateModal = () => {
        // Close the update modal and reset the form fields
        setShowUpdateModal(false);
        setUpdatedName("");
        setUpdatedPhoneNumber("");
        setUpdatedEmail("");
    };

    const handleSaveUpdatedContact = () => {
        // Save the updated contact details (you can add your logic here)
        fetch(`http://localhost:5000/api/contacts/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({updatedName,updatedEmail,updatedPhoneNumber})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    setReload(!reload);
                }
            })
        // Close the update modal
        handleCloseUpdateModal();
    };

 

    return (
        <Container fluid className="px-0">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="contact-column">
                            <input className="me-2" type="checkbox" />
                            Contacts
                            <BsThreeDotsVertical className="three-dot-icon" />
                        </th>
                        <th>CTA</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Current Date</th>
                    </tr>
                </thead>
                <tbody>
                    {allContacts.map((contact) => (
                        <tr key={contact.id}>
                            <td className="contact-column d-flex align-items-center">
                                <input type="checkbox" />
                                <CgProfile className="mx-2" />
                                <p className="d-inline-block ms-2 mb-0">{contact.name}</p>
                                <div onClick={() => {
                                    handleOpenMenu(contact)
                                    setClose(!close);
                                    { close && handleCloseMenu() }
                                }} className="threeDotBtnContainer">
                                    <BsThreeDotsVertical className="three-dot-icon" />
                                </div>

                                {showMenu && selectedContact && (
                                    <span
                                        className="d-inline-block deleteAndUpdateSpan"
                                    >
                                        {/* Update Button */}
                                        <GrDocumentUpdate onClick={() => handleUpdateContact(contact)} />
                                        {/* Delete Button */}
                                        <AiFillDelete className="ms-2" onClick={() => handleDeleteContact(contact)} />
                                    </span>
                                )}
                            </td>
                            <td>
                                <IoCallOutline />
                                <IoCallOutline />
                                <IoCallOutline />
                                <IoCallOutline />
                                <IoCallOutline />
                            </td>
                            <td>{contact.phoneNumber}</td>
                            <td>{contact.email}</td>
                            <td>Date loading...</td>
                        </tr>
                    ))}
                </tbody>
            </Table>





            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="updatedName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="updatedPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedPhoneNumber}
                                onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="updatedEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                value={updatedEmail}
                                onChange={(e) => setUpdatedEmail(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdateModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUpdatedContact}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export default ContactTable;
