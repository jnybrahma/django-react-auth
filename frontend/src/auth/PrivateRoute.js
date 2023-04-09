import { Route } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { useUser } from './useUser';

export const PrivateRoute = props => {
    const user = useUser();

    if (!user) return <LinkContainer to="/login" />

    return <Route {...props} />
}