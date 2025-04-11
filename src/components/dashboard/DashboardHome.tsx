import { useAuth } from "@/hooks/useAuth";


const DashboardHome = () => {
    const { user } = useAuth();
    return (
        <div>
            {
                user?.role === 'admin' ? <div className="">admin</div>
                 : 
                 <div className="">user</div>
            }
            
        </div>
    );
};

export default DashboardHome;