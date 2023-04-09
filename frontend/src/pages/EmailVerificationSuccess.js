import { useNavigate } from "react-router-dom";
import { Button} from 'react-bootstrap';

export const EmailVerificationSuccess = () => {

    const history = useNavigate();
    

    return (
        <div className="content-container">
            <h1>Success!</h1>
            <p>
                Thanks for verifying your email, now you can use all the app's features.
            </p>
            <Button onClick={() => history('/')}>Go to home page</Button>
        </div>
    );
}