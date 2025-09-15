import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { beginCreation, createItem } from "./itemsSlice";
import { useNavigate } from "react-router";

const ListItem = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState({
    image: "",
    title: "",
    category: "",
    description: "",
  });
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const [tradeOptions, setTradeOptions] = useState({
    electronics: false,
    furniture: false,
    technology: false,
    automobiles: false,
    clothing: false,
    price: 0,
  });
  const user = useSelector((state) => state.user.user);

  const maxLength = 100;

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setDescription(value);
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    setError({ ...error, image: "" });
    if (files.length === 0) {
      setError({ ...error, image: "Kindly select at least one image" });
      return;
    }

    if (files.length < 2) {
      setError({
        ...error,
        image:
          "Please select at least 2 images (one main image and additional views)",
      });
      return;
    }
    const fileArray = Array.from(files);
    const imageUrls = fileArray.map((file) => ({
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setImages(imageUrls);
  };

  const removeImages = () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });

    setImages([]);
    setError({ ...error, image: "" });

    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    let newErrors = { image: "", title: "", category: "", description: "" };

    if (!title.trim()) {
      newErrors.title = "Item name is required";
      hasError = true;
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
      hasError = true;
    }

    if (!category) {
      newErrors.category = "Please select a category";
      hasError = true;
    }

    if (images.length < 2) {
      newErrors.image = "Please select at least 2 images";
      hasError = true;
    }

    if (images.length > 4) {
      newErrors.image = "Maximum of 4 images";
      hasError = true;
    }

    if (hasError) {
      setError(newErrors);
      return;
    }

    const mainImage = images[0].preview;
    const additionalViews = images.slice(1).map((img) => img.preview);

    const itemData = {
      title,
      image: mainImage,
      additionalViews,
      description,
      category,
      tradeOptions,
      ownerEmail: user.email,
      ownerName: user.name,
      price: tradeOptions.price || 0,
    };
    console.log(itemData);
    try {
      const response = await fetch("/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        dispatch(beginCreation(itemData));
        dispatch(createItem());
      }
      setTitle("");
      setDescription("");
      setCategory("");
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
      setImages([]);
      setTradeOptions({
        electronics: false,
        furniture: false,
        technology: false,
        automobiles: false,
        clothing: false,
        price: 0,
      });
      setError({ image: "", title: "", category: "", description: "" });
      if (imageRef.current) {
        imageRef.current.value = "";
      }
      alert("Item submitted successfully!");
      navigate("/categories");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="px-3 py-2 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-6 space-y-4">
            <h3 className="font-semibold text-xl sm:text-2xl text-gray-800 border-b border-gray-200 pb-2">
              Upload Item Photos
            </h3>
            <p className="text-sm text-gray-600">
              Select at least 2 images. The first image will be your main photo,
              and the rest will be additional views.
            </p>

            <div className="space-y-2">
              <label
                htmlFor="images"
                className="text-base sm:text-[18px] font-semibold block mb-2"
              >
                Upload Images
              </label>
              <div className="relative w-full">
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  ref={imageRef}
                  className="block w-full text-sm text-gray-900 rounded-lg cursor-pointer border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                />

                {images.length > 0 && (
                  <div className="flex flex-col sm:flex-row justify-between gap-2 mt-2">
                    <span
                      onClick={removeImages}
                      className="my-2 mx-0 sm:mx-2 px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer text-center hover:bg-red-700 transition-colors"
                    >
                      Remove All Images
                    </span>
                    <span className="my-2 mx-0 sm:mx-2 px-4 py-2 bg-green-100 text-green-800 rounded-md text-center">
                      {images.length} image(s) selected
                    </span>
                  </div>
                )}

                {images.length > 0 && (
                  <div className="mt-4 text-sm text-gray-700">
                    <span className="font-semibold mr-4">Selected Images</span>
                    <div className="mb-4 wrap-normal">
                      {images.map((image, index) => (
                        <span
                          key={index}
                          className={
                            index === 0 ? "font-bold text-blue-600" : ""
                          }
                        >
                          {index === 0 ? `${image.name} (Main)` : image.name}
                          {index < images.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                    <div className="flex w-fit gap-2 sm:gap-4 flex-wrap">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image.preview}
                            className="h-20 w-24 sm:h-[100px] sm:w-[150px] object-cover rounded-md border-2 border-gray-200"
                            alt={image.name}
                          />
                          {index === 0 && (
                            <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                              Main
                            </span>
                          )}
                          {index !== 0 && index < 4 && (
                            <span className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                              Additional
                            </span>
                          )}
                          {index >= 4 && (
                            <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                              Excess
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {error.image && (
                  <div className="text-red-500 mt-2 text-sm">{error.image}</div>
                )}
              </div>
            </div>
          </div>
          <div className="my-6 space-y-6">
            <h3 className="font-semibold text-xl sm:text-2xl text-gray-800 border-b border-gray-200 pb-2">
              Item Details
            </h3>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block font-semibold text-gray-700"
              >
                Item Name
              </label>
              <input
                id="name"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="e.g Vintage Leather Jacket"
                className="w-full border-gray-300 border rounded-lg bg-white p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              {error.title && (
                <p className="text-red-500 text-sm">{error.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block font-semibold text-gray-700"
              >
                Description
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Describe your item in detail..."
                  rows="4"
                  className="w-full border-gray-300 border rounded-lg bg-white p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                />
                <div className="absolute bottom-2 right-3 text-xs text-gray-500 bg-white px-1">
                  <span
                    className={`${
                      description.length > 80
                        ? "text-orange-500"
                        : description.length === maxLength
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {description.length}
                  </span>
                  <span className="text-gray-400">/{maxLength}</span>
                </div>
              </div>
              {description.length > 80 && (
                <p
                  className={`text-xs mt-1 ${
                    description.length === maxLength
                      ? "text-red-500"
                      : "text-orange-500"
                  }`}
                >
                  {description.length === maxLength
                    ? "Character limit reached!"
                    : `${maxLength - description.length} characters remaining`}
                </p>
              )}
              {error.description && (
                <p className="text-red-500 text-sm">{error.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block font-semibold text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                className="w-full border-gray-300 border rounded-lg bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="" className="text-gray-300" disabled>
                  Select a category
                </option>
                <option value="technology">Technology</option>
                <option value="furniture">Furniture</option>
                <option value="clothing">Clothing</option>
                <option value="vehicles">Vehicles</option>
              </select>
              {error.category && (
                <p className="text-red-500 text-sm">{error.category}</p>
              )}
            </div>
          </div>

          <div className="my-6 space-y-4">
            <h3 className="font-semibold text-xl sm:text-2xl text-gray-800 border-b border-gray-200 pb-2">
              Trade Options
            </h3>
            <p className="text-sm text-gray-600">
              What would you like to trade this item for?
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className={`${
                  tradeOptions.electronics
                    ? "bg-blue-300 text-white px-4 py-2 rounded-full"
                    : "bg-gray-300 px-4 py-2 rounded-full"
                }`}
                type="button"
                onClick={() => {
                  setTradeOptions({
                    ...tradeOptions,
                    electronics: !tradeOptions.electronics,
                  });
                }}
              >
                <span className="font-semibold text-gray-800">Electronics</span>
              </button>
              <button
                type="button"
                className={`${
                  tradeOptions.furniture
                    ? "bg-blue-300 text-white px-4 py-2 rounded-full"
                    : "bg-gray-300 px-4 py-2 rounded-full"
                }`}
                onClick={() => {
                  setTradeOptions({
                    ...tradeOptions,
                    furniture: !tradeOptions.furniture,
                  });
                  console.log(tradeOptions);
                }}
              >
                <span className="font-semibold text-gray-800">Furniture</span>
              </button>
              <button
                type="button"
                className={`${
                  tradeOptions.technology
                    ? "bg-blue-300 text-white px-4 py-2 rounded-full"
                    : "bg-gray-300 px-4 py-2 rounded-full"
                }`}
                onClick={() => {
                  setTradeOptions({
                    ...tradeOptions,
                    technology: !tradeOptions.technology,
                  });
                }}
              >
                <span className="font-semibold text-gray-800">Technology</span>
              </button>
              <button
                type="button"
                className={`${
                  tradeOptions.automobiles
                    ? "bg-blue-300 text-white px-4 py-2 rounded-full"
                    : "bg-gray-300 px-4 py-2 rounded-full"
                }`}
                onClick={() => {
                  setTradeOptions({
                    ...tradeOptions,
                    automobiles: !tradeOptions.automobiles,
                  });
                }}
              >
                <span className="font-semibold text-gray-800">Automobiles</span>
              </button>
              <button
                type="button"
                className={`${
                  tradeOptions.clothing
                    ? "bg-blue-300 text-white px-4 py-2 rounded-full"
                    : "bg-gray-300 px-4 py-2 rounded-full"
                }`}
                onClick={() => {
                  setTradeOptions({
                    ...tradeOptions,
                    clothing: !tradeOptions.clothing,
                  });
                }}
              >
                <span className="font-semibold text-gray-800">Clothing</span>
              </button>
              <p>
                <label>Price</label>
                <input
                  type="number"
                  className="mt-1 block w-full border-gray-300 border rounded-lg bg-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={tradeOptions.price}
                  onChange={(e) =>
                    setTradeOptions({ ...tradeOptions, price: e.target.value })
                  }
                />
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Item for Bidding
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListItem;
