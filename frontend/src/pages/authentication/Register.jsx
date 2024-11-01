import React from 'react';
import {Container} from 'react-bootstrap';
import logo from '../../assets/images/Facebook-Logo.png';
import RegisterForm from '../../components/authentication/RegisterForm';

const Register = () => {
  return (
    <>
      <Container>
       <img src={logo} alt="apnibook" width={200} className='d-block mx-auto'/>
       <RegisterForm/>
      </Container>
    </>
  );
}

export default Register;
