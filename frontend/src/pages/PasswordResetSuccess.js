import { useNavigate} from "react-router-dom";
import { Button} from 'react-bootstrap';

export const PasswordResetSuccess = () => {
    
    const history = useNavigate();

    return (
        <div className="content-container">
            <h1>Success!</h1>
            <p>
                Your password has been reset, now please login with your new password.
            </p>
            <Button onClick={() => history('/login')}>Log in</Button>
        </div>
    );
}