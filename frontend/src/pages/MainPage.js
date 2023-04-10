import React , { useState, useEffect}from 'react';
import { Form,Button} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';


function MainPage() {
  return (
    <div class='text-center'><h4>Main Page </h4>
    <p></p>
    <hr/>
    <h5 class='text-center'> You need to login !</h5>
     <LinkContainer to={'/login'}>
    <Button variant='primary' className='btn-sm'><h5>Login</h5></Button>
     </LinkContainer>


    </div>
  )
}

export default MainPage