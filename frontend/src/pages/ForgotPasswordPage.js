import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button, Row , Col } from 'react-bootstrap';
import axios from 'axios';
import FormContainer from '../components/FormContainer';

export const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const history = useNavigate();

    const onSubmitClicked = async () => {
        try {
            await axios.put(`http://localhost:8000/api/users/forgot-password/${emailValue}/`);
            setSuccess(true);
            setTimeout(() => {
                history('/login');
            }, 3000);
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    return success ? (
        <div className="content-container">
            <h1>Success</h1>
            <p>Check your email for a reset link</p>
        </div>
    ) : (
        <div className="content-container">
            <h1>Forgot Password</h1>
            <p>Enter your email and we'll send you a reset link</p>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com" />
                &nbsp; &nbsp;
            <Button
                disabled={!emailValue}
                onClick={onSubmitClicked}
            >Send Reset Link</Button>
        </div>
    );
}