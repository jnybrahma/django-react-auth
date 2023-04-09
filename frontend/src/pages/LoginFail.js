import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button} from 'react-bootstrap';


function LoginFail() {
    const history = useNavigate();
    return (
    <div>
        <div class='text-center'><h2>Log-In Failure ! Please Try again </h2></div>
        <p1></p1>
         <Button onClick={() => history('/login')} class='text-center'>Back to Log in</Button>
    </div>
    )

}
export default LoginFail