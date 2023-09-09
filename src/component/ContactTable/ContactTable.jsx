import { Container, Table, Dropdown, DropdownButton } from "react-bootstrap";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { IoCallOutline } from 'react-icons/io5';
import './ContactTable.css';
import { useContext, useState } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import { GrDocumentUpdate } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';

const ContactTable = () => {
    const { allContacts, setAllContacts } = useContext(authContext);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [close, setClose] = useState(true);

    const handleDeleteContact = (e) => {
        console.log(e._id)
        fetch(`http://localhost:5000/api/contacts/${e._id}`, {
            method: 'DELETE'
        })
        .then(res=> res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount>0){
                alert('deleted successfully');
                const remaining = allContacts.filter(contacts => contacts._id !== e._id);
                setAllContacts(remaining); 
            }
        })

    }
    const handleUpdateContact = () => {

    }

    const handleOpenMenu = (contact) => {
        setSelectedContact(contact);
        setShowMenu(true);
    };

    const handleCloseMenu = () => {
        setSelectedContact(null);
        setShowMenu(false);
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
                                        <GrDocumentUpdate onClick={() => handleUpdateContact(selectedContact)}   />
                                        <AiFillDelete className="ms-2" onClick={() => handleDeleteContact(contact)}  />
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


        </Container>
    );
};

export default ContactTable;
