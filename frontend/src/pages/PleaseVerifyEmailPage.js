import { useEffect } from 'react';
import { useNavigate} from "react-router-dom";

export const PleaseVerifyEmailPage = () => {
     const history = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            history('/login');
        }, 3000);
    }, [history]);

    return (
        <div className="content-container">
            <h1>Thanks for Signing Up!</h1>
            <p>
                A verification email has been sent to the email address you provided.
                Please verify your email to unlock full site features.
            </p>
        </div>
    );
}