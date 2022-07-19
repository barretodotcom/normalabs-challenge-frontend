import { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Profile from '../pages/auth/Profile';
import CreateAccountPage from '../pages/CreateAccountPage';
import Funcionabillities from '../pages/Functionalities';
import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage';

export default function RouterContainer() {

    const { user } = useContext(AuthContext);

    const startRoutes = {
        path: "/",
        element: <Home />,
    };
    const loginRoute = {
        path: "/login",
        element: <LoginPage />,
    };
    const createAccountRoute = {
        path: "/create-account",
        element: <CreateAccountPage />,
    };
    const funcRoutes = {
        path: "/funcionabillities",
        element: <Funcionabillities />,
    };
    const profile = {
        path: "/profile",
        element: <Profile />,
    };
    const routing = useRoutes([
        startRoutes,
        funcRoutes,
        loginRoute,
        createAccountRoute,
        profile
    ]);

    return (
        <div>{routing}</div>
    )
}