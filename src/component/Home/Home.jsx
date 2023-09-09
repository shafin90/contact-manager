//This is the container component of whole application.

import { Container } from "react-bootstrap";
import './Home.css'
import CustomNavbar from "../CustomNavbar/CustomNavbar";
import ContactTable from "../ContactTable/ContactTable";


const Home = () => {
    return (
        <Container fluid  className="px-0">
            <CustomNavbar></CustomNavbar>
            <ContactTable></ContactTable>
            
        </Container>
    );
};

export default Home;