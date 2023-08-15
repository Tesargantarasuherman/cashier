import { Rightbar } from "../../components";
import { Dashboard, Home} from "../../pages";
import Checkout from "../../pages/Dashboard/Checkout";

const root = "/";


const admin = [
    {
        path: `${root}`,
        component: <Home/>,
        sidebar: true,
        rightbar:true,
        is_login_access:true,
        componentRightbar:<Rightbar/>
    },
    {
        path: `${root}/dashboard`,
        component: <Dashboard/>,
        sidebar: true,
        is_login_access:true,
    },
    {
        path: `${root}/checkout`,
        component: <Dashboard/>,
        sidebar: true,
        rightbar:true,
        is_login_access:true,
        componentRightbar:<Checkout/>
    }
];

export default admin;
