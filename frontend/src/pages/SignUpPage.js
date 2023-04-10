import { useState, useEffect } from 'react';
import { useNavigate , Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row , Col } from 'react-bootstrap';
import Loader  from '../components/Loader';
import Message  from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

export const SignUpPage = () => {
     

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const  [message, setMessage] = useState('')


    const history = useNavigate();

    const dispatch = useDispatch()
    const location = useLocation()
    const redirect = useLocation().search ? location.search.split('=')[1] : '/please-verify'
   
    const userRegister = useSelector(state => state.userRegister) // // this state is pulling from store.js
    const {error, loading, userInfo} = userRegister            // // this comes from Reducer.

      useEffect (() =>{
        if(userInfo){
            history(redirect)
        }
    }, [history, userInfo, redirect])

    const onSignUpClicked =  (e) => {
        //const response = await axios.post('http://localhost:8000/api/users/register/', {
        //    email: emailValue,
        //   password: passwordValue,
       // });
        //const { token } = response.data;
       // setToken(token);
       e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        } else{
            dispatch(register( email,password))
        }
       /// history('/please-verify');
    }



    return (
         <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}

           <Form>  
                <Form.Group controlId='email'>
                <Form.Label><h4>Email Address : &nbsp; </h4></Form.Label>
                <Form.Control
                type='email'
                placeholder='someone@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
        <hr/>
            
            <Form.Group controlId='password'>
                <Form.Label><h4>Password : &nbsp; </h4></Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <hr/>

            <Form.Group controlId='confirmpassword'>
                <Form.Label><h4>Confirm Password : &nbsp; </h4></Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter Password again'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <hr />
            <Button
                disabled={
                    !email || !password ||
                    password !== confirmPassword
                }
                onClick={onSignUpClicked}>Sign Up</Button>
                &nbsp; &nbsp;
            <Button onClick={() => history('/login')}>Already have an account? Log In</Button>
    </Form>
       </FormContainer>
    );
}