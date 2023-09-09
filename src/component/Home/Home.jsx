//This is the container component of whole application.

import { Container } from "react-bootstrap";
import './Home.css'
import CustomNavbar from "../CustomNavbar/CustomNavbar";


const Home = () => {
    return (
        <Container fluid  className="px-0">
            <CustomNavbar></CustomNavbar>
            
        </Container>
    );
};

export default Home;