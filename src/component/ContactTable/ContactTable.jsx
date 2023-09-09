import { Container, Table, Modal, Form, Button } from "react-bootstrap";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { IoCallOutline } from 'react-icons/io5';
import './ContactTable.css';
import { useContext, useState } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import { GrDocumentUpdate } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';
import { TbMessageMinus } from 'react-icons/tb';
import { BsWhatsapp } from 'react-icons/bs';
import { SlEnvolopeLetter } from 'react-icons/sl'

const ContactTable = () => {
    // State Declaration for this component
    const { allContacts, setAllContacts, setReload, reload } = useContext(authContext);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [close, setClose] = useState(true);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [id, setId] = useState('');
    const [newContact, setNewContact] = useState([])


    // Function to delete any row from the table
    const handleDeleteContact = (e) => {
        console.log(e._id)
        fetch(`https://contact-manager-server-sc28.vercel.app/api/contacts/${e._id}`, {
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



    // When user click on three dot icon, a menu is opened besides that having two icon, 1.update  2.delete
    const handleOpenMenu = (contact) => {
        const newContact = allContacts.find(e => e._id == contact._id)
        setNewContact(newContact)

        setSelectedContact(contact);
        setShowMenu(true);
    };

    
    // This is the function to close menu on which in previous comment has been talked.
    const handleCloseMenu = () => {
        setSelectedContact(null);
        setShowMenu(false);
        setNewContact(null)
    };


    // This is the function to update a row.
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

    
    // This function is resposible to close modal.
    const handleCloseUpdateModal = () => {
        // Close the update modal and reset the form fields
        setShowUpdateModal(false);
        setUpdatedName("");
        setUpdatedPhoneNumber("");
        setUpdatedEmail("");
    };


    // When user update any information, this function save that information to database.
    const handleSaveUpdatedContact = () => {
        // Save the updated contact details (you can add your logic here)
        fetch(`https://contact-manager-server-sc28.vercel.app/api/contacts/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ updatedName, updatedEmail, updatedPhoneNumber })
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
                            <div className="threeDotBtnContainer threeDotOnHeading">
                                <BsThreeDotsVertical className="three-dot-icon" />
                            </div>
                        </th>
                        <th className="text-center">CTA</th>
                        <th className="text-center">Mobile</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Current Date</th>
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

                                {newContact?._id == contact._id && (
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

                            <td className="text-center">
                                <IoCallOutline className="me-2" />
                                <TbMessageMinus className="me-2" />
                                <BsWhatsapp className="me-2" />
                                <SlEnvolopeLetter />

                            </td>
                            <td className="text-center">{contact.phoneNumber}</td>
                            <td className="text-center">{contact.email}</td>
                            <td className="text-center">{contact.date}</td>
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
