import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../helpers/routes';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import WalletPage from '../pages/WalletPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';


const AppRouter = () => {
    return (
        <Switch>
            <PublicRoute exact path={routes.home} component={HomePage} />
            <PublicRoute exact path={routes.register} component={RegisterPage} />
            <PublicRoute exact path={routes.login} component={LoginPage} />
            <PrivateRoute exact path={routes.wallet} component={WalletPage} />

            <Route path='*' component={NotFoundPage} />
        </Switch>

    );
}

export default AppRouter;