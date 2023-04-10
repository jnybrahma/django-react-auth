import axios from 'axios';
import React, { useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row , Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader  from '../components/Loader';
import Message  from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

export const LogInPage = () => {

        const  [email, setEmail] = useState('')
        const  [password, setPassword] = useState('')

        const history = useNavigate();

        const dispatch = useDispatch()
        const location =useLocation()
        const redirect = useLocation().search ? location.search.split('=')[1] : '/'


        const userLogin = useSelector(state => state.userLogin) // // this state is pulling from store.js
        const {error, loading, userInfo} = userLogin            // from userReducer
        
        useEffect (() =>{
            if(userInfo){
                history(redirect)
        }
    }, [history, userInfo, redirect])

        
         
    

        const onLogInClicked = (e) => {
            
            e.preventDefault()
            dispatch(login(email,password))

        }

        return ( 
        
          <FormContainer >

            <h1 > Log In </h1> 
            {error && <Message variant="danger" > { error } </Message>}
            {loading && <Loader/>} 
                <Form>
                    <Form.Group controlId = 'email' >
                    <Form.Label > <h4> Email Address: &nbsp; &nbsp; </h4> </Form.Label >
                    <Form.Control
                         type = 'email'
                          placeholder = 'someone@gmail.com'
                             value = { email }
                             onChange = {(e) => setEmail(e.target.value) } >
                    </Form.Control>
                     </Form.Group>

                <Form.Group controlId = 'password' >
                    <Form.Label> <h4> Password: &nbsp; &nbsp; </h4></Form.Label >
                    <Form.Control
                        type = 'password'
                        placeholder = 'Enter Password'
                        value = { password }
                        onChange = {(e) => setPassword(e.target.value) } >
                    </Form.Control>
                    </Form.Group>
                     <hr/>
                    <Button variant = 'primary' disabled = {!email || !password } onClick = { onLogInClicked } >Log In </Button>
                     <hr/>
                    < Button variant = 'primary' onClick = {() => history('/forgot-password') } > Forgot your password ? </Button >
                    &nbsp;
                     <Button variant = 'primary' onClick = {() => history('/signup') } >  Don 't have an account? Sign Up </Button>
                </Form>
                </FormContainer>
            );
        }