import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../../assets/images/Facebook-Logo.png';
import LoginKaForm from '../../components/authentication/LoginKaForm';
import '../../components/authentication/utils/auth.css';


const Login = () => {
  return (
    <>
      <Container className='d-flex height-70 justify-content-center align-items-center col-xl-7 col-lg-9 col-md-9 col-sm-10 mx-auto'>
        <Row className='w-100'>
            <Col lg={6}>
             <img src={logo} width={200} alt="apnibook" />
             <p className="fs-4 m-0 p-style">Facebook helps you connect and share with the people in your life.</p>
            </Col>

            <Col lg={6}>
             <LoginKaForm/>
            </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
