import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const MainLayout = () => {
    return (
        <div className="container">
            <Sidebar/>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout