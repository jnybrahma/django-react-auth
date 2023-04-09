import { useNavigate} from "react-router-dom";
import { Button} from 'react-bootstrap';

export const EmailVerificationFail = () => {
 
      const history = useNavigate();

    return (
        <div className="content-container">
            <h1>Uh oh...</h1>
            <p>
                Something went wrong while trying to verify your email.
            </p>
            <Button onClick={() => history('/signup')}>Back to Sign-up</Button>
        </div>
    );
}