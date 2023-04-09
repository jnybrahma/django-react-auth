import React , { useState, useEffect}from 'react';
import { useNavigate, useParams} from "react-router-dom";
import { Form,Button} from 'react-bootstrap';
import { useToken } from '../auth/useToken';
import { useUser } from '../auth/useUser';

import FormContainer from '../components/FormContainer';


function HomePage() {


   
    const is_email_verified = true;

    const user = useUser();
    const [token, setToken] = useToken();
    
    const history = useNavigate();
    
    const { id, email, info } = user;
    
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

   
    

     const logOut = () => {
        localStorage.removeItem('token');
        history('/login');
    }

    
    return (
     <FormContainer>
        <div className='text-center'>
            <h1>Info for </h1>
            <h2>Welcome to  Home Page! You have successfully logged-In! </h2>
            { is_email_verified === false ? (
                <h5 style={{ color: 'red' }}>You won't be able to make any changes until you verify your email</h5>
            ) :(<i></i>)
            }
        </div>
        <Button onClick={logOut}>Log Out</Button>
     </FormContainer>
    )

}
export default HomePage