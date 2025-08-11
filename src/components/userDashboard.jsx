import { useSelector } from "react-redux";
import { Items } from "./data";

const UserDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const uploads = useSelector((state) => state.upload.uploads); // all uploads
  const userUploads = uploads.filter((img) => img.email === user.email); // uploads made by the current user
  const ItemOwner = Items.filter(
    (item) => (user.firstName + " " + user.lastName === item.ownerName) && user.email === item.ownerEmail
  ); //filters items that belong to the current user in the Items array
  const OwnedItemsForBid = ItemOwner.map((item) => item.title) // makes an array of titles from the Item array
  console.log(OwnedItemsForBid)
  const currentBids = uploads.filter(
    (upload) => OwnedItemsForBid.includes(upload?.itemForBid)
  ) // so this is meant to filter the uploads based on if their titles are in the previous array, then i still have to filter again to get the ones that are not made by the owner themselves.
  const nonCompromisedBids = currentBids.filter(
    (item) => item.email !== user.email
  );// this is to filter out the bids made by the owner themselves and it actually works so don't touch.
  console.log(nonCompromisedBids);
  return (
    <div className="w-full mx-auto py-6 sm:py-10 px-4 bg-white">
      <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
        Your Yearly Statistics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-10 max-w-6xl mx-auto">
        <div className="py-4 px-4 sm:px-6 bg-gray-100 rounded-md shadow-sm">
          <p className="font-semibold text-base sm:text-lg text-gray-700">Offers You Made</p>
          <div className="my-3 text-3xl sm:text-4xl font-extrabold text-green-600 text-center">
            {userUploads.length > 0 ? userUploads.length : "0"}
          </div>
        </div>
        <div className="py-4 px-4 sm:px-6 bg-gray-100 rounded-md shadow-sm">
          <p className="font-semibold text-base sm:text-lg text-gray-700">
            Deals You've Completed
          </p>
          <div className="my-3 text-3xl sm:text-4xl font-extrabold text-blue-600 text-center">
            4
          </div>
        </div>
        <div className="py-4 px-4 sm:px-6 bg-gray-100 rounded-md shadow-sm">
          <p className="font-semibold text-base sm:text-lg text-gray-700">User Ratings</p>
          <div className="my-3 text-3xl sm:text-4xl font-extrabold text-yellow-600 text-center">
            4.7
          </div>
        </div>
      </div>
      {userUploads ? (
        <div className="my-4 mx-auto py-4 px-4 sm:px-6 w-full max-w-6xl bg-gray-100 rounded-md shadow-sm">
          <p className="font-semibold text-base sm:text-lg text-gray-700 mb-4">
            Most Recent Upload
          </p>
          <div className="my-3 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse border border-gray-300 rounded-md overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-300 text-center text-xs sm:text-sm font-semibold text-gray-700">
                    Id
                  </th>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-300 text-center text-xs sm:text-sm font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-300 text-center text-xs sm:text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="px-2 sm:px-4 py-2 border-b border-gray-300 text-center text-xs sm:text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {userUploads.map((upload, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-300 ${
                      index % 2 === 0
                        ? "bg-white hover:bg-gray-100"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <td className="px-2 sm:px-4 py-2 text-center text-xs sm:text-sm text-gray-600">
                      {upload.id}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-center text-xs sm:text-sm text-gray-600 capitalize">
                      {upload.title}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-center text-xs sm:text-sm text-gray-600">
                      {upload.description}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-center text-xs sm:text-sm text-gray-600">
                      {upload.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="my-4 mx-auto py-4 px-4 sm:px-6 w-full max-w-6xl bg-gray-100 rounded-md shadow-sm">
          <p className="font-semibold text-base sm:text-lg text-gray-700 text-center">
            No Recent Uploads
          </p>
          <div className="flex justify-center">
            <img className="h-32 w-32 sm:h-40 sm:w-40 m-4 block mx-auto" src="/sad-face.svg" alt="No uploads" />
          </div>
        </div>
      )}
      <div className="my-6 mx-auto py-4 px-4 sm:px-6 w-full max-w-6xl bg-gray-100 rounded-md shadow-sm">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Items for sale</h3>
        <div>
          {ItemOwner.length > 0 ? (
            ItemOwner.map((item, index) => (
              <div
                key={index}
                className="my-4 p-4 bg-white rounded-md shadow-sm border border-gray-200"
              >
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h4>
                <hr className="text-gray-600 mb-4" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                  <p className="text-sm sm:text-base text-gray-600">Price: ${item.price}</p>
                  <p className="text-sm sm:text-base text-gray-600">Days Since Upload: 9</p>
                </div>
                <div className="space-y-4">
                  {nonCompromisedBids.map((bid, bidIndex) => (
                    <div className="border border-gray-300 rounded-md p-3 sm:p-4" key={bidIndex}>
                      <p className="font-semibold text-sm sm:text-base mb-3">{bid.user}</p>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between items-start sm:items-center py-2 mb-4">
                        <button className="bg-red-500 px-3 py-2 text-white rounded-md text-sm hover:bg-red-600 transition-colors w-full sm:w-auto">
                          Decline
                        </button>
                        <button className="bg-green-500 px-3 py-2 text-white rounded-md text-sm hover:bg-green-600 transition-colors w-full sm:w-auto">
                          Accept
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                        {bid.image.map((img, imgIndex) => (
                          <img 
                            src={img} 
                            key={imgIndex} 
                            alt="Bid item" 
                            className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-md border border-gray-200" 
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No items for sale</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
