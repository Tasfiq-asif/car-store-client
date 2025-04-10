
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./sideber";

const Dashboard = () => {

    return(
        <div className="flex">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-opacity-30  bg-black">
            <AppSidebar/>
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-8">
            <Outlet/>
        </div>
    </div>
    );
};

export default Dashboard;