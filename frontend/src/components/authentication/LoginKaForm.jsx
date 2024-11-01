import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaRegEyeSlash , FaRegEye } from "react-icons/fa";
import {Button} from "@mui/material";


const LoginKaForm = () => {
    const [showEye , setShowEye] = useState(false);
    const [showPass , setShowPass] = useState(false);
    const [formFields , setFormFields] = useState({
        m_mail:"",
        password:"",
    });

    const {m_mail , password} = formFields;

    const handleChange = (e) => {
      setFormFields ({
        ...formFields,
        [e.target.name] : e.target.value,
      })
    }

    useEffect(() => {
      if (password.length > 0) {
          setShowEye(true);
      } else {
          setShowEye(false);
      }
  }, [password]);
  






  return (
    <>
      <Form className='p-4 shadow rounded-3 col-xl-10 mx-auto'>
       <Form.Control className='p-3 shadow-0' value={m_mail} onChange={handleChange} name='m_mail' type='text' placeholder='Email address or phone number'/>
       <div className="inp-bordr border my-2 rounded-2 pe-2 d-flex align-items-center">
       <Form.Control className='border-0 p-3 shadow-0'value={password} onChange={handleChange} name='password' type={`${showPass ? 'text' : 'password'}`} placeholder='Password'/>
       {
        showEye && (
            <>
            {
              showPass ? (
                <>
                <FaRegEye className="me-3" onClick={()=>setShowPass(false)} size={20} cursor='pointer' />
                </>
              ) : (
                <>
                <FaRegEyeSlash className="me-3" onClick={()=>setShowPass(true)} size={20} cursor='pointer' />
                </>
              )
            }
            </>
        )
       }
       </div>
       <Button varient="contained" className='w-100 p-2 bg-blue text-white'>
         Log in
       </Button>
       <a href="" className="text-primary text-decoration-none d-block text-center my-1">Forgotten password?</a>
       <hr/>

       <Button varient="contained" className='w-50 mx-auto d-block bg-green text-lowercase text-white py-2'>
         <span>C</span>reate new account
       </Button>

       
      </Form>
    </>
  );
}

export default LoginKaForm;
