import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { EmailVerificationSuccess } from './EmailVerificationSuccess';
import { EmailVerificationFail } from './EmailVerificationFail';

export const EmailVerificationLandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const { verification_token } = useParams();
    const [,setToken] = useToken();

    useEffect(() => {
        const loadVerification = async () => {
            try {
                //const response = await axios.put('http://localhost:8000/api/users/verify-email/', { verification_token });
                const response = await axios.put(`http://localhost:8000/api/users/verify-email/${verification_token}/`);
                const { token } = response.data;
                setToken(token);
                setIsSuccess(true);
                setIsLoading(false);
            } catch (e) { 
                setIsSuccess(false);
                setIsLoading(false);
            }
        }

        loadVerification();
    }, [setToken, verification_token]);

    if (isLoading) return <p>Loading...</p>;
    if (!isSuccess) return <EmailVerificationFail />
    return <EmailVerificationSuccess />
}