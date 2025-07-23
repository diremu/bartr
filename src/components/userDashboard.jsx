import { useSelector } from "react-redux";

const UserDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const uploads = useSelector((state) => state.upload.uploads);
  const userUploads = uploads.filter((img) => img.email === user.email);
  console.log(userUploads)
  return (
    <div className="w-full mx-auto py-10 px-4 bg-white">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Your Yearly Statistics
      </h3>
      <div className="flex items-center justify-center gap-8 mb-10 mx-10">
        <div className="my-4 mx-auto py-4 px-6 w-[50%] bg-gray-100 rounded-md shadow-sm">
          <p className="font-semibold text-lg text-gray-700">Offers You Made</p>
          <div className="my-3 text-4xl font-extrabold text-green-600 text-center">
            {userUploads.length > 0 ? userUploads.length : "0"}
          </div>
        </div>
        <div className="my-4 mx-auto py-4 px-6 w-[50%] bg-gray-100 rounded-md shadow-sm">
          <p className="font-semibold text-lg text-gray-700">
            Deals You've Completed
          </p>
          <div className="my-3 text-4xl font-extrabold text-blue-600 text-center">
            4
          </div>
        </div>
        <div className="my-4 mx-auto py-4 px-6 w-[50%] bg-gray-100 rounded-md shadow-sm">
          <p className="font-semibold text-lg text-gray-700">User Ratings</p>
          <div className="my-3 text-4xl font-extrabold text-yellow-600 text-center">
            4.7
          </div>
        </div>
      </div>
      {userUploads ? (
        <div className="my-4 mx-auto py-4 px-6 w-[80%] bg-gray-100 rounded-md shadow-sm">
          <p className="font-semibold text-lg text-gray-700">Most Recent Upload</p>
          <div className="my-3 text-center">
            <table className="outline outline-gray-400 w-full">
              <thead>
                <tr className="px-2 py-2">
                  <th>Id</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  userUploads.map((upload, index) => (
                    <tr key={index} className="px-2 py-2 mx-3 my-2">
                      <td>{upload.id}</td>
                      <td>{upload.title}</td>
                      <td>{upload.description}</td>
                      <td>{upload.status}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="my-4 mx-auto py-4 px-6 w-[80%] bg-gray-100 rounded-md shadow-sm">
          <p className="font-semibold text-lg text-gray-700">No Recent Uploads</p>
          <img className="h-40 w-40 m-4 block mx-auto" src="/sad-face.svg" />
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
