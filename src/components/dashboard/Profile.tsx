import ProfileCard from "./ProfileCard";
import ProfileManagement from "./UserDashboard/ProfileManagement";

const Profile = () => {
  return (
    <div className="flex flex-col items-center w-full gap-8">
      <ProfileCard />
      <ProfileManagement />
    </div>
  );
};

export default Profile;
