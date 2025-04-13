import ProfileCad from "./ProfileCad";
import UpdatePassword from "./UpdatePassword";

const Profile = () => {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-full p-4 gap-3 ">
            <ProfileCad/>
            <UpdatePassword/>
        </div>
    );
};

export default Profile;