import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import routes from '../helpers/routes';

const PrivateRoutes = (props) => {

    const auth = useAuth()

    if (auth.user === "") return <Redirect to={routes.home} />

    return <Route {...props} />
}

export default PrivateRoutes;
