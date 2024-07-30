import { createBrowserRouter } from "react-router-dom";
import Header from "../Header/Header";
import App from "../../App";

const router = createBrowserRouter ([
    {
        path:'/',
        element:<App/>
    },
    {
        path:'/header',
        element:<Header/>
    }
])
export default router