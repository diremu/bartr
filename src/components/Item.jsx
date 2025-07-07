import { useParams } from "react-router";
import { Items } from "./data.js";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";

const Item = () => {
  const { category, item } = useParams();
  const product = Items[0];
  const images = product.additionalViews;
  const options = product.tradeOptions;
  const similar = Items.filter(
    (similarItem) =>
      similarItem.category === category && similarItem.item !== item
  );
  const user = useSelector((state) => state.user.isAuthenticated);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const changeVisibility = () => {
    if (visible == false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  // console.log(document.getElementById("eventDiv"))

  return (
    <div className="lg:mx-[10vw] my-6 h-full w-[80%] relative" id="eventDiv">
      {visible ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setVisible(false)}
        >
          <div
            className="border-[1px] border-black h-[30%] bg-gray-300 rounded-sm p-4 left-[25%] right-[25%] absolute"
            onClick={(e) => e.stopPropagation()}
          >
            {/* use conditional styles for when logged in */}
            {user ? (
              <div>
                <p>Upload documents</p>
              </div>
            ) : (
              <div className="bg-[#c98c088a] h-full w-full">
                <h4 className="text-[22px] font-semibold text-center py-3">
                  You need to log in to trade here
                </h4>
                <br />
                <p className="px-4 text-left">
                  Join a wonderful community where you can trade your items for
                  others!<br /> Our platform enables trade in a free and fair way for
                  all involved. Join now and don't look back
                </p>
                <button
                  className="block mx-auto my-6"
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
            {/* <div className={`bg-url(${image1}) bg-contain`}>a</div> */}
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
                    <img src={item.image} className="h-[120px]  rounded-sm" />
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
