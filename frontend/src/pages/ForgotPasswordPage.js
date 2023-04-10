import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row , Col } from 'react-bootstrap';
import axios from 'axios';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_PROFILE_FAIL} from '../constants/userConstants';


export const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const history = useNavigate();
    const dispatch = useDispatch()

    

    const onSubmitClicked = async () => {
        try {
           const {data} = await axios.put(`http://localhost:8000/api/users/forgot-password/${email}/`);
           //dispatch({
        //    payload: data
         //  })
            setSuccess(true);
            setTimeout(() => {
                history('/login');
            }, 3000);
        } catch (error) {
           setErrorMessage(error.message);
           //setErrorMessage(error.response.data.detail);
        
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
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="someone@gmail.com" />
                &nbsp; &nbsp;
            <Button
                disabled={!email}
                onClick={onSubmitClicked}
            >Send Reset Link</Button>
        </div>
    );
}