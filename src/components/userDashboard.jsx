import { useSelector } from "react-redux";

const UserDashboard = () => {
  const user = useSelector(state => state.user.user);
  const uploads = useSelector(state => state.upload.uploads);
  const userUploads = uploads.filter(img => img.user === user.email)


  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h3>See your statisitics for the year, displayed for your comfort</h3>
      <div>
        <p>Offers you setup</p>
        <div>{userUploads}</div>
        
      </div>
    </div>
  );
};

export default UserDashboard;
