import { useSelector, useDispatch } from "react-redux";
import { useState } from "react"
import { updateUserInfo } from "../userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const fname = user.firstName;
  const lname = user.lastName;
  const year = user.createdAt.split("-")[0];
  const actualDay = user.createdAt.split("-")[2].split("T")[0];
  const actualMonth = user.createdAt.split("-")[1];
  const [newFname, setFname] = useState(fname)
  const [newLname, setLname] = useState(lname);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  console.log(user);

  return (
    <div className="mx-4 sm:mx-6 lg:mx-[10%]">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center my-6 sm:my-10">
        <div className="bg-gray-400 h-24 w-24 sm:h-32 sm:w-32 flex items-center justify-center rounded-full mb-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-black">
            {fname.charAt(0) + lname.charAt(0)}
          </h1>
        </div>
        <h3 className="text-lg sm:text-xl font-bold capitalize text-center">{fname + " " + lname}</h3>
        <p className="text-gray-600 text-sm">Joined in {year}</p>
        <button
          className="my-4 py-2 px-4 sm:py-3 sm:px-6 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-600 transition-colors"
          onClick={() => {
            setEdit(true)
          }}
        >
          Change Details
        </button>
      </div>
      <div className="w-full max-w-2xl mx-auto border-b-[1.8px] border-gray-400 py-2">
        <div className="font-bold text-sm sm:text-[15.4px]">About</div>
      </div>
      <div className="w-full max-w-2xl mx-auto py-4">
        <div className="text-gray-700 text-base sm:text-lg space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-semibold">First Name:</span> 
            {edit ? (
              <input 
                onChange={(e) => setFname(e.target.value)} 
                value={newFname} 
                className="border-blue-300 border-[1.3px] rounded-xl px-3 py-1 focus-visible:outline-0 focus:ring-2 focus:ring-blue-400 w-full sm:w-auto" 
              />
            ) : (
              <span>{fname}</span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-semibold">Last Name:</span> 
            {edit ? (
              <input 
                onChange={(e) => setLname(e.target.value)} 
                value={newLname} 
                className="border-blue-300 border-[1.3px] rounded-xl px-3 py-1 focus-visible:outline-0 focus:ring-2 focus:ring-blue-400 w-full sm:w-auto" 
              />
            ) : (
              <span>{lname}</span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-semibold">Email:</span> <span>{user.email}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-semibold">Joined:</span> <span>{actualDay} / {actualMonth} / {year}</span>
          </div>
        </div>
        {edit ? (
          <button 
            onClick={() => dispatch(updateUserInfo({firstName: newFname, lastName: newLname}))}
            className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save changes
          </button>
        ) : ""}
      </div>
    </div>
  );
};

export default Profile;
