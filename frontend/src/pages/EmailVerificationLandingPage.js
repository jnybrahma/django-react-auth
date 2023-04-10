import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useToken } from '../auth/useToken';
import { EmailVerificationSuccess } from './EmailVerificationSuccess';
import { EmailVerificationFail } from './EmailVerificationFail';
import {USER_UPDATE_PROFILE_SUCCESS,  USER_REGISTER_FAIL,   USER_UPDATE_PROFILE_FAIL, USER_LOGIN_SUCCESS,} from '../constants/userConstants';

export const EmailVerificationLandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const { verification_token } = useParams();
    //const [,setToken] = useToken();
    const dispatch = useDispatch()

    useEffect(() => {
        const loadVerification = async () => {
            try {
                //const response = await axios.put('http://localhost:8000/api/users/verify-email/', { verification_token });
                const { data } = await axios.put(`http://localhost:8000/api/users/verify-email/${verification_token}/`);
                 dispatch({
                 type: USER_UPDATE_PROFILE_SUCCESS,
                  payload: data
               })
               dispatch({
               type: USER_LOGIN_SUCCESS,
              payload: data
             
        })
         localStorage.setItem('userInfo' , JSON.stringify(data))
               // const { token } = response.data;
               // setToken(token);
               setIsSuccess(true);
                setIsLoading(false);
            } catch (error) { 
                setIsSuccess(false);
                setIsLoading(false);
                 dispatch ({
                type: USER_UPDATE_PROFILE_FAIL,
                  payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message

        })
            }
        }

        loadVerification();
    }, [ dispatch, verification_token]);

    if (isLoading) return <p>Loading...</p>;
    if (!isSuccess) return <EmailVerificationFail />
    return <EmailVerificationSuccess />
}