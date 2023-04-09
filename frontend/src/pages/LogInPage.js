import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import { useToken } from '../auth/useToken';
import FormContainer from '../components/FormContainer';

export const LogInPage = () => {
        const [token, setToken] = useToken();        

        const [errorMessage, setErrorMessage] = useState('');

        const [emailValue, setEmailValue] = useState('');
        const [passwordValue, setPasswordValue] = useState('');
        const history = useNavigate();

    

        const onLogInClicked = async() => {
            const config = {
                withCredentials: false,
                headers: {
                    'Content-type': 'application/json'
                }
            }
            try {
            const response = await axios.post('http://localhost:8000/api/users/login/', {
                email: emailValue,
                password: passwordValue,
            }, config);
            const { token, email, is_email_verified  } = response.data;
            setToken(token);
            console.log("email:", email)
            console.log("Email verified:", is_email_verified)
         
            history('/');
             } catch(e){
                history('/loginFail')
            }

        }

        return ( 
        
          <FormContainer >

            <h1 > Log In </h1> 
            {errorMessage && <div className = "fail" > { errorMessage } </div>} 
                <Form>
                    <Form.Group controlId = 'email' >
                    <Form.Label > <h4> Email Address: &nbsp; &nbsp; </h4> </Form.Label >
                    <Form.Control
                         type = 'email'
                          placeholder = 'someone@gmail.com'
                             value = { emailValue }
                             onChange = {(e) => setEmailValue(e.target.value) } >
                    </Form.Control>
                     </Form.Group>

                <Form.Group controlId = 'password' >
                    <Form.Label> <h4> Password: &nbsp; &nbsp; </h4></Form.Label >
                    <Form.Control
                        type = 'password'
                        placeholder = 'Enter Password'
                        value = { passwordValue }
                        onChange = {(e) => setPasswordValue(e.target.value) } >
                    </Form.Control>
                    </Form.Group>
                     <hr/>
                    <Button variant = 'primary' disabled = {!emailValue || !passwordValue } onClick = { onLogInClicked } >Log In </Button>
                     <hr/>
                    < Button variant = 'primary' onClick = {() => history('/forgot-password') } > Forgot your password ? </Button >
                    &nbsp;
                     <Button variant = 'primary' onClick = {() => history('/signup') } >  Don 't have an account? Sign Up </Button>
                </Form>
                </FormContainer>
            );
        }