import { useNavigate } from "react-router-dom";
import { Button} from 'react-bootstrap';

export const PasswordResetFail = () => {
    
    const history = useNavigate();

    return (
        <div className="content-container">
            <h1>Uh oh...</h1>
            <p>
                Something went wrong while trying to reset your password.
            </p>
            <Button onClick={() => history('/login')}>Back to Log in</Button>
        </div>
    );
}