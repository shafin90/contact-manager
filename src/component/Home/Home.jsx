//This is the container component of whole application.

import { Container, Spinner } from "react-bootstrap";
import './Home.css'
import CustomNavbar from "../CustomNavbar/CustomNavbar";
import ContactTable from "../ContactTable/ContactTable";
import { useContext } from "react";
import { authContext } from "../AuthProvider/AuthProvider";


const Home = () => {
    const { allContacts } = useContext(authContext);
    return (
        <Container fluid className="px-0">
            <CustomNavbar></CustomNavbar>
            <ContactTable></ContactTable>
            {
                allContacts.length == 0 &&
                <div className="w-100 h-75 d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
        </Container>
    );
};

export default Home;