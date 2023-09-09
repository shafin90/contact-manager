// This is the table content of the component

import { Container, Table } from "react-bootstrap";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { IoCallOutline } from 'react-icons/io5';
import './ContactTable.css';
import { useContext } from "react";
import { authContext } from "../AuthProvider/AuthProvider";

const ContactTable = () => {
    const {allContacts} = useContext(authContext); // collecting data from authProvider through context API
    const contacts = [
        {
            id: 1,
            name: "John Doe",
            phoneNumber: "555-123-4567",
            email: "john.doe@example.com",
        },
        {
            id: 2,
            name: "Jane Smith",
            phoneNumber: "555-987-6543",
            email: "jane.smith@example.com",
        },
        // Add more contact objects as needed
    ];

    return (
        <Container fluid className="px-0">
            <Table striped bordered hover>
                <thead >
                    <tr >

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
                                {/* <span className="three-dots-icon"></span> Add the three-dot icon */}
                                <BsThreeDotsVertical className="three-dot-icon" />
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
