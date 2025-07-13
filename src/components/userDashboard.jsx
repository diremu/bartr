import { useSelector } from "react-redux";

const UserDashboard = () => {
  const user = useSelector(state => state.user.user);
  const uploads = useSelector(state => state.upload.uploads);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const userUploads = uploads && user ? uploads.filter(img => img.user === user.email) : [];

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Please sign in to view your dashboard.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {user?.firstName || "User"}!</h1>
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your Profile</h2>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-500">
            {user.firstName[0]}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Uploaded Images</h2>
        {userUploads && userUploads.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {userUploads.map((img, idx) => (
              <div key={img.id || idx} className="flex flex-col items-center">
                <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                  {img.data ? (
                    <img src={img.data} alt={img.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span className="text-gray-400 text-sm">{img.name}</span>
                  )}
                </div>
                <span className="text-xs text-gray-600">{img.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't uploaded any images yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
