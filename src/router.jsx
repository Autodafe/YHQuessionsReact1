import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import CurrentQuestion from "./pages/CurrentQuestion/CurrentQuestion";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
            path:'/',
            element: <Home />
            },
            {
            path:'/question/:id',
            element: <CurrentQuestion />
            },
            {
                path:'*',
                element: <NotFoundPage />
            }
        ]
    }
])

