import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button, Row , Col } from 'react-bootstrap';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import FormContainer from '../components/FormContainer';

export const SignUpPage = () => {
    const [token, setToken] = useToken();

    const [errorMessage, setErrorMessage] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    const history = useNavigate();

   

    const onSignUpClicked = async () => {
        const response = await axios.post('http://localhost:8000/api/users/register/', {
            email: emailValue,
            password: passwordValue,
        });
        const { token } = response.data;
        setToken(token);
        history('/please-verify');
    }

    return (
         <FormContainer>
            <h1>Sign Up</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
    <Form>  
                <Form.Group controlId='email'>
                <Form.Label><h4>Email Address : &nbsp; </h4></Form.Label>
                <Form.Control
                type='email'
                placeholder='someone@gmail.com'
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}>
                </Form.Control>
            </Form.Group>
        <hr/>
            
            <Form.Group controlId='password'>
                <Form.Label><h4>Password : &nbsp; </h4></Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter Password'
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <hr/>

            <Form.Group controlId='confirmpassword'>
                <Form.Label><h4>Confirm Password : &nbsp; </h4></Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter Password again'
                value={confirmPasswordValue}
                onChange={(e) => setConfirmPasswordValue(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <hr />
            <Button
                disabled={
                    !emailValue || !passwordValue ||
                    passwordValue !== confirmPasswordValue
                }
                onClick={onSignUpClicked}>Sign Up</Button>
                &nbsp; &nbsp;
            <Button onClick={() => history('/login')}>Already have an account? Log In</Button>
    </Form>
       </FormContainer>
    );
}