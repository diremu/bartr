import { useParams, useNavigate } from "react-router";
import { Items } from "./data.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { beginUpload, completeUpload } from "../uploadSlice.js";
import { current } from "@reduxjs/toolkit";

const Item = () => {
  const { category, item } = useParams();
  const product = Items.find(
    (productItem) =>
      productItem.category === category && productItem.item === item
  );
  const images = product.additionalViews;
  const options = product.tradeOptions;
  const similar = Items.filter(
    (similarItem) =>
      similarItem.category === category && similarItem.item !== item
  );
  const user = useSelector((state) => state.user.isAuthenticated);
  const currentUser = useSelector((state) => state.user.user);
  const uploadError = useSelector((state) => state.upload.uploadError);
  const [visible, setVisible] = useState(false);
  const [currentUpload, setCurrentUpload] = useState([]);
  const navigate = useNavigate();
  const uploadRef = useRef(null);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [names, setNames] = useState([]);
  const userEmail = useSelector((state) => state.user?.user?.email);
  const [formError, setFormError] = useState({description: "", title: "",})

  const changeVisibility = () => {
    setVisible(!visible);
  };

  useEffect(() => {
  if (currentUpload.length > 0) {
    dispatch(beginUpload({ uploadFiles: currentUpload }));
    console.log("dispatched uploads: ", currentUpload);
  }
}, [currentUpload, dispatch]);

const convertBeforeUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const imageView = URL.createObjectURL(file);

  setNames((former) => [...former, file.name]);
  setCurrentUpload((prev) => [...prev, imageView]);
};
  const onSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setFormError((prev) => ({ ...prev, title: "Please enter a title for your item" }));
    } else if (description === "") {
      setFormError((prev) => ({ ...prev, description: "Please select a condition for your item" }));
    } else if (currentUpload.length === 0) {
      alert("Please upload at least one image for your item");
    } else {
      dispatch(
        completeUpload({
          file: currentUpload,
          user: currentUser,
          title: title,
          description: description,
          email: userEmail,
          status: "pending"
        })
      );
      setVisible(false);
      setCurrentUpload([]);
      setNames([]);
      if (uploadRef.current) {
        uploadRef.current.value = "";
      }
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="lg:mx-[10vw] my-6 h-full w-[80%] relative" id="eventDiv">
      {visible ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setVisible(false)}
        >
          <div
            className={`border-[1px] border-black rounded-sm p-4 absolute ${
              user
                ? "bg-gray-200 h-max w-[60%] left-[20%] right-[20%]"
                : "bg-gray-300 h-[40%] left-[25%] right-[25%]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {user ? (
              <div>
                <h3 className="text-2xl font-bold mb-4 mt-2">Make an Offer</h3>
                <form onSubmit={onSubmit}>
                  <p className="text-[18px] mb-2 border-b-gray-900 pb-2 border-b-[0.6px]">
                    What items do you want to trade?
                  </p>
                  <div className="my-4 mx-2">
                    <div className="flex flex-col gap-3">
                      <div>
                        <label htmlFor="title" className="text-[17px]">
                          What is the item?
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="block bg-white rounded-md px-4 py-2 border-black w-[75%] hover:outline-0 my-3 mx-2 focus:outline-0"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                        />
                      </div>
                      {formError.title && (
                        <div className="text-red-500 mt-2">
                          {formError.title}
                        </div>
                      )}
                      <div>
                        <label htmlFor="description" className="text-[17px]">
                          What's the condition of the item?
                        </label>
                        <select
                          id="description"
                          onChange={(e) => setDescription(e.target.value)}
                          className="block bg-white rounded-md px-4 py-2 border-black w-[75%] hover:outline-0 my-3 mx-2 focus:outline-0"
                          defaultValue=""
                        >
                          <option value="" disabled className="text-gray-500">
                            Select condition
                            </option>
                          <option value="new">New</option>
                          <option value="fairlyused">Fairly Used</option>
                          <option value="moderatelyused">
                            Moderately Used
                          </option>
                          <option value="heavilyused">
                            Heavily Used/ Worn Out
                          </option>
                        </select>
                      </div>
                      {formError.description && (
                        <div className="text-red-500 mt-2">{formError.description}</div>
                      )}
                      <label
                        htmlFor="upload"
                        className="text-[18px] font-semibold block mb-2"
                      >
                        Upload Images
                      </label>
                      <div className="relative w-full">
                        <input
                          type="file"
                          id="upload"
                          accept="image/*"
                          onChange={convertBeforeUpload}
                          ref={uploadRef}
                          className="block w-full text-gray-900 rounded-lg cursor-pointer border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                        />
                        <div></div>
                        <div className="flex justify-between mt-2">
                          <span
                            onClick={() => {
                              setNames([]);
                              setCurrentUpload([]);
                              if (uploadRef.current) {
                                uploadRef.current.value = "";
                              }
                            }}
                            className="my-2 mx-2 px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer"
                          >
                            Remove
                          </span>
                          <button
                            type="submit"
                            onClick={onSubmit}
                            className="text-white bg-green-600 px-4 py-2 my-2 mx-2 rounded-md"
                          >
                            Upload
                          </button>
                        </div>
                        {currentUpload && currentUpload.length > 0 && (
                          <div className="mt-2 text-sm text-gray-700">
                            <span className="font-semibold mr-4">
                              Picked Images
                            </span>
                            <div className="mb-4 wrap-normal">
                              {currentUpload.map((file, index) => (
                                <span key={index}>
                                  {names[index]}
                                  {index < currentUpload.length - 1 ? ", " : ""}
                                </span>
                              ))}
                            </div>
                            <div className="flex w-fit gap-4 flex-wrap">
                              {currentUpload.map((file, index) => (
                                <img
                                  src={currentUpload[index]}
                                  key={index}
                                  className="h-[100px] w-[150px] aspect-square"
                                  alt={`${names[index]}`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {uploadError && (
                          <div className="text-red-500 mt-2">{uploadError}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-[#41cee78a] h-full w-full">
                <h4 className="text-[22px] font-semibold text-center py-3">
                  You need to log in to trade here
                </h4>
                <br />
                <p className="px-4 text-center text-[16px]">
                  Join a wonderful community where you can trade your items for
                  others!
                  <br /> Our platform enables trade in a free and fair way for
                  all involved. Join now and don't look back
                </p>
                <button
                  className="block mx-auto my-6 px-3 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  onClick={() => navigate("/signup")}
                >
                  Join Us
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="p-0 m-0">
        <p className="py-5">
          <span className="pr-2 font-semibold capitalize">{category}</span> /
          <span className="pl-2 font-semibold capitalize">{item}</span>
        </p>
        <div className="flex flex-col md:flex-row ">
          <div className="w-[50%]">
            <img className="h-[680px] bg-cover" src={images[0]} />
          </div>
          <div className="flex flex-col justify-center">
            <img className="h-[340px] w-[400px]" src={images[1]} />
            <img className="h-[340px] w-[400px]" src={images[2]} />
          </div>
        </div>
        <div className="my-6">
          <div className="mb-4">
            <h3 className="text-3xl font-[600]">{product.title}</h3>
            <p className="text-gray-600 text-[16px]">
              {" "}
              Condition - {product.subtitle}
            </p>
            <section className="py-4">
              <p className="text-xl font-semibold">Description</p>
              <p className="text-[15px]">{product.description}</p>
            </section>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Barter Options</h4>
            {options.map((item, index) => (
              <span key={index} className="relative inline-block mr-2">
                <button
                  className="py-1 px-3 border-black bg-gray-50 border-[1.1px] rounded-full"
                  onClick={() => changeVisibility()}
                >
                  {item}
                </button>
              </span>
            ))}
            <span className="mx-6 font-bold">||</span>
            <button className="bg-gray-500 py-2 px-4 rounded-3xl">
              ${product.price}
            </button>
            <br />
            <br />
            <button className="bg-blue-500 rounded-full py-2 px-3 my-4 text-white">
              Message the owner
            </button>
          </div>
          <div>
            <h5 className="text-xl font-semibold">Similar Items</h5>
            <div className="flex flex-wrap gap-4 mt-4">
              {similar.map((item, index) => (
                <div key={index}>
                  <div className="w-full">
                    <img src={item.image} className="h-[120px] rounded-sm" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
