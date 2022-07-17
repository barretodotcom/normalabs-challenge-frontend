import { useRoutes } from 'react-router-dom';
import CreateAccountPage from '../components/CreateAccountPage';
import Funcionabillities from '../components/functionalities';
import Home from '../components/Home'
import LoginPage from '../components/LoginPage';

export default function RouterContainer() {

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
    // const myRecipes = {
    //     path: "/recipes",
    //     element: <RecipesPage />,
    // };
    const routing = useRoutes([
        startRoutes,
        funcRoutes,
        loginRoute,
        createAccountRoute
    ]);

    return (
        <div>{routing}</div>
    )
}