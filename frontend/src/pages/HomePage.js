import React , { useState, useEffect}from 'react';
import { useNavigate, useParams, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form,Button} from 'react-bootstrap';
import { logout } from "../actions/userActions";
import FormContainer from '../components/FormContainer';


function HomePage() {


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect (() => {
         if(!userInfo) {
            history('/mainPage')
         }

  })

    
   /// const { id, email, info } = user;
    


   
    const logOut = () => {
   
        dispatch(logout());
        history('/login');
    };

    // const logOut = () => {
    //    localStorage.removeItem('token');
    //    history('/login');
   // }

    
    return (
     <FormContainer>
        <div className='text-center'>
            <h2>Welcome to  Home Page! </h2>
            <h4>{ userInfo !== null ? userInfo.email : <i></i>}</h4>
            { userInfo !== null  && userInfo.is_email_verified === false ? (
                <h5 style={{ color: 'red' }}>You won't be able to make any changes until you verify your email</h5>
            ) :(<h5 style={{ color: 'green' }}> Congratulation ! You are fully verified</h5>)
            }
        </div>
        <Button onClick={logOut}>Log Out</Button>
     </FormContainer>
    )

}
export default HomePage