import { Card , Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const [months] = useState([
    'Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec'
]);
  const [formFields , setFormFields] = useState({
    f_name:'',
    l_name:'',
    m_mail:'',
    password:'',
    gender:'',
    date:new Date().getDate(),
    month:months[new Date().getMonth()],
    year:new Date().getFullYear(),
  });

  const {f_name,l_name,m_mail,password,gender,date,month,year} = formFields;
    const [years , setYears] = useState([]);
    const getCurrentYear = new Date().getFullYear();
    const getStartYear = 1905;


    useEffect(() => {
      let temp = []
      for (let i = getCurrentYear; i >= getStartYear; i--) {
          temp.push(i); // Correct usage
      }
      setYears(temp);
    }, []);
    
    const handleChange = (e) => {
       setFormFields({
         ...formFields,
         [e.target.name] : e.target.value,
       });
    };
    const handleRegister = async(e) => {
      e.preventDefault()
      const dataForBE = {
        f_name,l_name,m_mail,password,gender,dob:`${date}-${month}-${year}`
      }
      const response = await axios.post('http://localhost:3001/api/user/register-user',dataForBE);
      console.log(response.data);
    };
  return (
    <>
      <Card className='shadow p-3 rounded-3 border-0 col-lg-4 col-md-7 col-sm-9 mx-auto'>
        <Form>
            <h3 className="text-center ">Create a new account</h3>
            <p className="text-secondary text-center">It's quick and easy.</p>
            <hr/>
            <div className="d-flex gap-2 my-1">
                <Form.Control value={f_name} onChange={handleChange} className='shadow-0' type='text' placeholder='First name' name='f_name'/>
                <Form.Control value={l_name} onChange={handleChange} className='shadow-0' type='text' placeholder='Surename' name='l_name'/>
            </div>
            <Form.Label className='dob text-secondary'>Date of birth <span className='rounded-full bg-secondary text-white p-1 text-sm '>?</span></Form.Label>
            <div className="d-flex gap-2">
             <Form.Select name='date' value={date} onChange={handleChange} className='shadow-0'>
                {Array.from({length:31}).map((_,index)=>{
                    return <option key={index} value={index+1}>
                        {index+1}
                    </option>
                })}
             </Form.Select>
             <Form.Select name='month' value={month} onChange={handleChange} className='shadow-0'>
                {months?.map((item,index)=>{
                    return <option key={index} value={item}>
                       {item}
                    </option>
                })}
             </Form.Select>
             <Form.Select name='year' value={year} onChange={handleChange} className='shadow-0'>
                {years?.map((item,index)=>{
                    return <option key={index} value={item}>
                      {item}
                    </option>
                })}
             </Form.Select>
            </div>
            <Form.Label className='dob text-secondary my-2'>Gender <span className='rounded-full bg-secondary text-white p-1 text-sm '>?</span></Form.Label>
            <div className="d-flex gap-2 justify-content-between">
              <div className="border d-flex p-1 rounded-3 w-100 justify-content-between ">
                <Form.Label className='text-md'>
                  Female
                </Form.Label>
                <input 
                aria-selected='false'
                type="radio" 
                name='gender' 
                value="female" 
                className="form-check"
                onChange={handleChange} 
                />
              </div>
              <div className="border d-flex rounded-3 p-1 w-100 justify-content-between ">
                <Form.Label className='text-md'>
                  male
                </Form.Label>
                <input 
                aria-selected='false'
                type="radio" 
                name='gender' 
                value="male" 
                className="form-check"
                onChange={handleChange}
                 />
              </div>
              <div className="border d-flex p-1 rounded-3 w-100 justify-content-between">
                <Form.Label className='text-md'>
                  Custom
                </Form.Label>
                <input 
                aria-selected='false'
                type="radio" 
                name='gender' 
                value="custom" 
                className="form-check"
                onChange={handleChange} 
                />
              </div>
              
            </div>
            <Form.Control className='shadow-0 my-2 p-2' type='text' placeholder='Mobile number or email address' name='m_mail' value={m_mail} onChange={handleChange}/>
            <Form.Control className='shadow-0 my-2 p-2' type='password' placeholder='New Password' name='password' value={password} onChange={handleChange}/>
            <p className="text-secondary text-sm">People who use our service may have uploaded your contact information to Facebook.<a href="" className='text-decoration-none text-primary'> Learn more.</a></p>
            <p className="text-secondary text-sm">By clicking Sign Up, you agree to our<a href="" className='text-decoration-none text-primary'> Terms,</a> <a href="" className='text-decoration-none text-primary'>Privacy Policy</a> and <a href="" className='text-decoration-none text-primary'>Cookies Policy</a> . You may receive SMS notifications from us and can opt out at any time.</p>
            <Button onClick={handleRegister} variant='Contained' className='bg-green text-white fw-900 text-capitalized d-block w-50 mx-auto'>
              Sign Up
            </Button>
            <Link to='/' className='text-primary text-decoration-none d-block mx-auto text-center my-2'>
            Already have an account ?
            </Link>
        </Form>
      </Card>
    </>
  );
}

export default RegisterForm;
