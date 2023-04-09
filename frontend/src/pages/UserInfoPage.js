import { useState, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import { Form,Button} from 'react-bootstrap';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { useUser } from '../auth/useUser';
import FormContainer from '../components/FormContainer';
import { LinkContainer } from "react-router-bootstrap";


export const UserInfoPage = () => {
    const user = useUser();
    const [token, setToken] = useToken();
    const history = useNavigate();
    
    const { id, email, is_email_verified, info } = user;

    // We'll use the history to navigate the user
    // programmatically later on (we're not using it yet)
   

    // These states are bound to the values of the text inputs
    // on the page (see JSX below). 
    const [favoriteFood, setFavoriteFood] = useState(info.favoriteFood || '');
    const [hairColor, setHairColor] = useState(info.hairColor || '');
    const [bio, setBio] = useState(info.bio || '');

    // These state variables control whether or not we show
    // the success and error message sections after making
    // a network request (see JSX below).
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    // This useEffect hook automatically hides the
    // success and error messages after 3 seconds when they're shown.
    // Just a little user interface improvement.
    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showSuccessMessage, history, id, user,showErrorMessage]);
    
    const saveChanges = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/users/${id}`, {
                favoriteFood,
                hairColor,
                bio,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { token: newToken } = response.data;
            setToken(newToken);
            setShowSuccessMessage(true);
        } catch (error) {
            setShowErrorMessage(true);
        }
    }

    const logOut = () => {
        localStorage.removeItem('token');
        history('/login');
    }
    
    const resetValues = () => {
        setFavoriteFood(info.favoriteFood);
        setHairColor(info.hairColor);
        setBio(info.bio);
    }

    
    // And here we have the JSX for our component. It's pretty straightforward
    return (
        <FormContainer>
            <h1>Info for {email}</h1>
            {!is_email_verified && <div className="fail"><h5 style={{ color: 'red' }}>You won't be able to make any changes until you verify your email</h5></div>}
            {showSuccessMessage && <div className="success"><h4 style={{ color: 'green' }}>Successfully saved user data!</h4></div>}
            {showErrorMessage && <div className="fail"><h5 style={{ color: 'red' }}>Uh oh... something went wrong and we couldn't save changes</h5></div>}
             <hr/>
             <p></p>
            <label>
                <h5>Favorite Food:  &nbsp;  &nbsp;
                <input
                    onChange={e => setFavoriteFood(e.target.value)}
                    value={favoriteFood} />
                </h5>
            </label>
            <p></p>
            <hr/>
            <label>
               <h5> Hair Color: &nbsp;  &nbsp;
                <input
                    onChange={e => setHairColor(e.target.value)}
                    value={hairColor} />
                </h5>
            </label>
             <p></p>
            <hr/>
            <label>
                <h5>Bio: &nbsp;  &nbsp;
                <input
                    onChange={e => setBio(e.target.value)}
                    value={bio} />
                </h5>
            </label>
            <hr />
            <Button onClick={saveChanges}>Save Changes</Button>
            &nbsp; &nbsp;
            <Button onClick={resetValues}>Reset Values</Button>
            &nbsp; &nbsp;
            <Button onClick={logOut}>Log Out</Button>
        </FormContainer>
    );
}