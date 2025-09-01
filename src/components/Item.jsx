import { useParams, useNavigate } from "react-router";
import { Items } from "./data.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { beginUpload, completeUpload } from "../uploadSlice.js";

const Item = () => {
  const { category, item } = useParams();
  const reduxItems = useSelector((state) => state.items.items);
  
  const allItems = [...Items, ...reduxItems];
  
  const product = allItems.find(
    (productItem) =>
      productItem.category === category && productItem.item === item
  );
  
  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">Item not found</p>
      </div>
    );
  }
  
  const images = product.additionalViews;
  const options = product.tradeOptions;
  const similar = allItems.filter(
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
      console.log(product.ownerEmail, product.ownerName)
      dispatch(
        completeUpload({
          user: currentUser,
          title: title,
          description: description,
          email: userEmail,
          status: "pending",
          itemForBid: product.title,
          itemOwner: product.ownerName,
          itemOwnerEmail: product.ownerEmail,
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
    <div className="lg:mx-[10vw] my-4 sm:my-6 h-full w-full px-4 sm:px-6 lg:w-[80%] relative" id="eventDiv">
      {visible ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setVisible(false)}
        >
          <div
            className={`border border-gray-300 rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
              user
                ? "bg-white shadow-xl"
                : "bg-gray-50 shadow-xl"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {user ? (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 mt-2">Make an Offer</h3>
                <form onSubmit={onSubmit}>
                  <p className="text-base sm:text-[18px] mb-2 border-b-gray-900 pb-2 border-b-[0.6px]">
                    What items do you want to trade?
                  </p>
                  <div className="my-4 mx-2">
                    <div className="flex flex-col gap-3">
                      <div>
                        <label htmlFor="title" className="text-base sm:text-[17px]">
                          What is the item?
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="block bg-white rounded-md px-4 py-2 border border-gray-300 w-full sm:w-[75%] hover:outline-0 my-3 mx-0 sm:mx-2 focus:outline-0 focus:ring-2 focus:ring-blue-400"
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
                        <label htmlFor="description" className="text-base sm:text-[17px]">
                          What's the condition of the item?
                        </label>
                        <select
                          id="description"
                          onChange={(e) => setDescription(e.target.value)}
                          className="block bg-white rounded-md px-4 py-2 border border-gray-300 w-full sm:w-[75%] hover:outline-0 my-3 mx-0 sm:mx-2 focus:outline-0 focus:ring-2 focus:ring-blue-400"
                          defaultValue=""
                        >
                          <option value="" disabled className="text-gray-500">
                            Select condition
                            </option>
                          <option value="New">New</option>
                          <option value="Fairly Used">Fairly Used</option>
                          <option value="Moderately Used">
                            Moderately Used
                          </option>
                          <option value="Heavily Used">
                            Heavily Used / Worn Out
                          </option>
                        </select>
                      </div>
                      {formError.description && (
                        <div className="text-red-500 mt-2">{formError.description}</div>
                      )}
                      <label
                        htmlFor="upload"
                        className="text-base sm:text-[18px] font-semibold block mb-2"
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
                          className="block w-full text-sm text-gray-900 rounded-lg cursor-pointer border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                        />
                        <div></div>
                        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-2">
                          <span
                            onClick={() => {
                              setNames([]);
                              setCurrentUpload([]);
                              if (uploadRef.current) {
                                uploadRef.current.value = "";
                              }
                            }}
                            className="my-2 mx-0 sm:mx-2 px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer text-center"
                          >
                            Remove
                          </span>
                          <button
                            type="submit"
                            onClick={onSubmit}
                            className="text-white bg-green-600 px-4 py-2 my-2 mx-0 sm:mx-2 rounded-md"
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
                            <div className="flex w-fit gap-2 sm:gap-4 flex-wrap">
                              {currentUpload.map((file, index) => (
                                <img
                                  src={currentUpload[index]}
                                  key={index}
                                  className="h-20 w-24 sm:h-[100px] sm:w-[150px] object-cover rounded-md"
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg h-full w-full p-4">
                <h4 className="text-lg sm:text-[22px] font-semibold text-center py-3 text-gray-800">
                  You need to log in to trade here
                </h4>
                <p className="px-4 text-center text-sm sm:text-[16px] text-gray-600 leading-relaxed">
                  Join a wonderful community where you can trade your items for
                  others!
                  <br className="hidden sm:block" /> Our platform enables trade in a free and fair way for
                  all involved. Join now and don't look back
                </p>
                <button
                  className="block mx-auto my-6 px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
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
        <p className="py-3 sm:py-5 text-sm sm:text-base">
          <span className="pr-2 font-semibold capitalize">{category}</span> /
          <span className="pl-2 font-semibold capitalize">{item}</span>
        </p>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <div className="w-full lg:w-[50%]">
            <img className="h-64 sm:h-80 lg:h-[680px] w-full object-cover rounded-lg" src={images[0]} />
          </div>
          <div className="flex flex-col gap-2 lg:gap-0 w-full lg:w-auto">
            <img className="h-32 sm:h-40 lg:h-[340px] w-full lg:w-[400px] object-cover rounded-lg" src={images[1]} />
            <img className="h-32 sm:h-40 lg:h-[340px] w-full lg:w-[400px] object-cover rounded-lg" src={images[2]} />
          </div>
        </div>
        <div className="my-4 sm:my-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-2xl sm:text-3xl font-[600] mb-2">{product.title}</h3>
            <p className="text-gray-600 text-sm sm:text-[16px] mb-2">
              Condition - {product.subtitle}
            </p>
            <section className="py-4">
              <p className="text-lg sm:text-xl font-semibold mb-2">Description</p>
              <p className="text-sm sm:text-[15px] leading-relaxed text-gray-700">{product.description}</p>
            </section>
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Barter Options</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {options.map((item, index) => (
                <span key={index} className="relative inline-block">
                  <button
                    className="py-1 px-3 sm:py-2 sm:px-4 border border-gray-400 bg-gray-50 rounded-full text-sm sm:text-base hover:bg-gray-100 transition-colors"
                    onClick={() => changeVisibility()}
                  >
                    {item}
                  </button>
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <span className="text-lg sm:text-xl font-bold">||</span>
              <button className="bg-gray-500 py-2 px-4 rounded-full text-white font-semibold">
                ${product.price}
              </button>
            </div>
            <button className="bg-blue-500 rounded-full py-2 px-4 sm:py-3 sm:px-6 text-white font-semibold hover:bg-blue-600 transition-colors w-full sm:w-auto">
              Message the owner
            </button>
          </div>
          <div className="mt-6 sm:mt-8">
            <h5 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Similar Items</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {similar.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="w-full">
                    <img src={item.image} className="h-24 sm:h-32 w-full object-cover" alt={item.title} />
                  </div>
                  <div className="p-2 sm:p-3">
                    <p className="text-xs sm:text-[13px] font-semibold text-gray-800 line-clamp-2">{item.title}</p>
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
