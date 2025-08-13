import { useSelector } from "react-redux";
import { useState } from "react";

const ListItem = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tradeOptions, setTradeOptions] = useState({
    electronics: false,
    furniture: false,
    technology: false,
    automobiles: false,
    clothing: false,
    price: 0,
  })
  
  const maxLength = 100;
  
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setDescription(value);
    }
  };



  return (
    <div className="px-3 py-2 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <form>
          <div>
            <h2>Upload Item Photos</h2>
            <input type="file"  />
          </div>
          <div className="my-6 space-y-6">
            <h3 className="font-semibold text-xl sm:text-2xl text-gray-800 border-b border-gray-200 pb-2">Item Details</h3>
            
            <div className="space-y-2">
              <label htmlFor="name" className="block font-semibold text-gray-700">Item Name</label>
              <input 
                id="name" 
                type="text"
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g Vintage Leather Jacket" 
                className="w-full border-gray-300 border rounded-lg bg-white p-3 placeholder:text-gray-400 focus:outline-none" 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="block font-semibold text-gray-700">Description</label>
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
                  <span className={`${description.length > 80 ? 'text-orange-500' : description.length === maxLength ? 'text-red-500' : 'text-gray-500'}`}>
                    {description.length}
                  </span>
                  <span className="text-gray-400">/{maxLength}</span>
                </div>
              </div>
              {description.length > 80 && (
                <p className={`text-xs mt-1 ${description.length === maxLength ? 'text-red-500' : 'text-orange-500'}`}>
                  {description.length === maxLength 
                    ? "Character limit reached!" 
                    : `${maxLength - description.length} characters remaining`}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="block font-semibold text-gray-700">Category</label>
              <select 
                id="category"
                className="w-full border-gray-300 border rounded-lg bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" className="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="furniture">Furniture</option>
                <option value="clothing">Clothing</option>
                <option value="vehicles">Vehicles</option>
              </select>
            </div>
          </div>
          
          <div className="my-6 space-y-4">
            <h3 className="font-semibold text-xl sm:text-2xl text-gray-800 border-b border-gray-200 pb-2">Trade Options</h3>
            <p className="text-sm text-gray-600">What would you like to trade this item for?</p>
            <div className="flex flex-wrap gap-3">
                <button className={`${tradeOptions.electronics ? "bg-blue-300 text-white px-4 py-2 rounded-full" : "bg-gray-300 px-4 py-2 rounded-full"}`} type="button" onClick={() => {
                    setTradeOptions({...tradeOptions, electronics: !tradeOptions.electronics})
                }}>
                    <span className="font-semibold text-gray-800">Electronics</span>
                </button>
                <button type="button" className={`${tradeOptions.furniture ? "bg-blue-300 text-white px-4 py-2 rounded-full" : "bg-gray-300 px-4 py-2 rounded-full"}`} onClick={() => {
                    setTradeOptions({...tradeOptions, furniture: !tradeOptions.furniture})
                    console.log(tradeOptions)
                }}>
                    <span className="font-semibold text-gray-800">Furniture</span>
                </button>
                <button type="button" className={`${tradeOptions.technology ? "bg-blue-300 text-white px-4 py-2 rounded-full" : "bg-gray-300 px-4 py-2 rounded-full"}`} onClick={() => {
                    setTradeOptions({...tradeOptions, technology: !tradeOptions.technology})
                }}>
                    <span className="font-semibold text-gray-800">Technology</span>
                </button>
                <button type="button" className={`${tradeOptions.automobiles ? "bg-blue-300 text-white px-4 py-2 rounded-full" : "bg-gray-300 px-4 py-2 rounded-full"}`} onClick={() => {
                    setTradeOptions({...tradeOptions, automobiles: !tradeOptions.automobiles})
                }}>
                    <span className="font-semibold text-gray-800">Automobiles</span>
                </button>
                <button type="button" className={`${tradeOptions.clothing ? "bg-blue-300 text-white px-4 py-2 rounded-full" : "bg-gray-300 px-4 py-2 rounded-full"}`} onClick={() => {
                    setTradeOptions({...tradeOptions, clothing: !tradeOptions.clothing})
                }}>
                    <span className="font-semibold text-gray-800">Clothing</span>
                </button>
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
