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
          <p className="font-semibold text-lg text-gray-700 mb-4">
            Most Recent Upload
          </p>
          <div className="my-3 text-center">
            <table className="w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-300 text-center text-sm font-semibold text-gray-700">
                    Id
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300 text-center text-sm font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300 text-center text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300 text-center text-sm font-semibold text-gray-700">
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
                    <td className="px-4 py-2 text-center text-sm text-gray-600">
                      {upload.id}
                    </td>
                    <td className="px-4 py-2 text-center text-sm text-gray-600 capitalize">
                      {upload.title}
                    </td>
                    <td className="px-4 py-2 text-center text-sm text-gray-600">
                      {upload.description}
                    </td>
                    <td className="px-4 py-2 text-center text-sm text-gray-600">
                      {upload.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="my-4 mx-auto py-4 px-6 w-[80%] bg-gray-100 rounded-md shadow-sm">
          <p className="font-semibold text-lg text-gray-700">
            No Recent Uploads
          </p>
          <img className="h-40 w-40 m-4 block mx-auto" src="/sad-face.svg" />
        </div>
      )}
      <div className="my-6 mx-auto py-4 px-6 w-[80%] bg-gray-100 rounded-md shadow-sm">
        <h3>Items for sale</h3>
        {/* basic idea is that there is like a smaller part under that allows you to click through the bids */}
        <div>
          {ItemOwner.length > 0 ? (
            ItemOwner.map((item, index) => (
              <div
                key={index}
                className="my-4 p-4 bg-white rounded-md shadow-sm"
              >
                <h4 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h4>
                <hr className="text-gray-600" />
                <br />
                <p className="text-gray-600">Price: ${item.price}</p>
                <p className="text-gray-600 my-4">Days Since Upload: 9</p>
                {nonCompromisedBids.map((item, index) => (
                  <div className="border-[1.5px] border-gray-300 rounded-md p-4" key={index}>
                    <p>{item.user}</p>
                    <div className="flex w-full justify-between items-center py-4 px-6">
                      <button className="bg-red-500 px-4 py-2 text-white rounded-md">Decline</button>
                      <button className="bg-green-500 px-4 py-2 text-white rounded-md">Accept</button>
                    </div>
                    <div>
                      {item.image.map((img, index) => (
                        <img src={img} key={index} alt="Examples" className="h-50 w-50" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No items for sale</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
