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
    <div className="mx-[10%]">
      <div className="w-full max-auto flex flex-col items-center justify-center my-10">
        <div className="bg-gray-400 h-32 w-32 flex items-center justify-center rounded-full mb-4">
          <h1 className="text-6xl font-bold text-black">
            {fname.charAt(0) + lname.charAt(0)}
          </h1>
        </div>
        <h3 className="text-xl font-bold capitalize">{fname + " " + lname}</h3>
        <p className="text-gray-600 text-sm">Joined in {year}</p>
        <button
          className="my-4 py-3 px-4 bg-gray-500 text-white rounded-full font-semibold"
          onClick={() => {
            setEdit(true)
          }}
        >
          Change Details
        </button>
      </div>
      <div className="w-full border-b-[1.8px] border-gray-400 py-2">
        <div className="font-bold text-[15.4px]">About</div>
      </div>
      <div className="w-full py-4">
        <div className="text-gray-700 text-lg">
          <p className="mb-4">
            <span className="font-semibold">First Name:</span> {edit ? <input onChange={(e) => setFname(e.target.value)} value={newFname} className="border-blue-300 border-[1.3px] rounded-xl px-4 focus-visible:outline-0" /> : fname}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Last Name:</span> {edit ? <input onChange={(e) => setLname(e.target.value)} value={newLname} className="border-blue-300 border-[1.3px] rounded-xl px-4 focus-visible:outline-0" /> : lname}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Joined:</span> {actualDay} / {actualMonth} / {year}
          </p>
        </div>
        {edit ? <button onClick={() => dispatch(updateUserInfo({firstName: fname, lastName: lname}))}>Save changes</button> : ""}
      </div>
    </div>
  );
};

export default Profile;
