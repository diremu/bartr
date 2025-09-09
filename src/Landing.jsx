import Card from "./components/Card";
import { Items as fallbackItems, Categories, Testimonials, choiceCards } from "./components/data";
import FeaturesCard from "./components/FeaturesCard"
import Footer from "./components/Footer";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {useEffect, useState} from "react";

export default function Landing() {
  const [Items, setItems] = useState(fallbackItems);
  useEffect(() => {
    fetch("http://localhost:3200/items")
    .then(res => {
      if (!res.ok) throw new Error("Network wasn't strong enough")
      return res.json()
    }).then(data => {
      setItems(data.items)
    }).catch (err => {
      console.error("Fetch error: ", err)
      setItems(fallbackItems)
    })
  }, [])
  //the code above tries to fetch the data from the backend then display that
  const imgUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB9TxmopJZytwUCJUiPSVwGKGBUN35kGNQ9nTZ0QCeZL2GDs-8Rm3yuwK9uTiy1XM2fchfQRrWc_28tvjaxB82rPJ0qAclVCUGCim3nOcto0bvjw4ddwkcOHyuE08I_M0EFS9GLACaBCU1aOBpzcRhbMYiy65p5LrUJvFaCdMvamZs1SfS--T3c2r5uGwUuaGavDQskVvMFF2-OBJP7zkLJ6OqibgfRKky4uGBX4VNuqN98c45P7efWhYXijdbNyHwfIUvzuR7Hsn8";
    const nav = useNavigate();
    const user = useSelector((state) => state.user.user);
    fetch("http://localhost:3200")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <div className="flex flex-col items-center">
        <div className="p-4 sm:p-6 w-full max-w-4xl xl:max-w-6xl">
          <img
            className="w-full h-48 sm:h-64 lg:h-80 object-cover bg-center bg-no-repeat bg-cover rounded-lg sm:rounded-xl"
            src={imgUrl}
          />
        </div>
        <div className="w-full max-w-4xl xl:max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-start gap-4 sm:gap-6">
            <h2 className="font-semibold text-lg sm:text-xl">Featured Items</h2>
            <div className="overflow-x-auto pb-4 custom-scrollbar">
              <div className="flex gap-2 sm:gap-3 min-w-max pr-4">
                {Items.map((item, index) => (
                  <Card
                    key={index}
                    image={item.image}
                    title={item.title}
                    subtitle={item.subtitle}
                    onClick={() => nav(`/categories/${item.category}/${item.item}`)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start gap-4 sm:gap-6 mt-6 sm:mt-8">
            <h2 className="font-semibold text-lg sm:text-xl">Popular Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
              {Categories.map((data, index) => (
                <Card key={index} type="category" image={data.image} title={data.title}
                onClick={() => nav(`/categories/${data.category}`)} />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-start gap-4 sm:gap-6 my-6 sm:my-8">
            <h2 className="font-semibold text-lg sm:text-xl">User Testimonials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Testimonials.map((data, index) => (
                <Card key={index} type="testimony" image={data.image} title={data.title} subtitle={data.subtitle} />
              ))}
            </div>
          </div>
          <div className="mb-8 sm:mb-10 mt-8 sm:mt-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Why Choose Bartr?</h3>
            <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-10 max-w-4xl">
              <p className="font-[450] text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-loose text-gray-700">
                Bartr provides a trusted and efficient marketplace for exchanging items with cash adjustments.
              </p>
              <p className="font-[450] text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-loose text-gray-700">
                Our platform ensures secure transactions, fair value assessments, and convenient logistics, making it easier than ever to upgrade your belongings.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {choiceCards.map((card, index) => (
                <FeaturesCard
                  key={index}
                  image={card.icon}
                  title={card.title}
                  subtitle={card.description}
                />
              ))}
          </div>
        </div>
        {!user ? (<div className="w-full max-w-4xl xl:max-w-6xl px-4 sm:px-6 lg:px-8 my-8 sm:my-12 lg:my-16 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Ready to Swap?</h2>
            <p className="mt-3 mb-4 sm:mb-6 text-sm sm:text-base">Join Bartr today and start exchanging your items for cash and new treasures.</p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg" onClick={() => nav("/signup")}>Get Started</button>
        </div>) : (
          <div className="w-full max-w-4xl xl:max-w-6xl px-4 sm:px-6 lg:px-8 my-8 sm:my-12 lg:my-16 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Welcome back to Bartr</h2>
            <p className="mt-3 mb-4 sm:mb-6 text-sm sm:text-base">Are you ready to start trading your items?</p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg" onClick={() => nav('/list-item')}>Start Trading</button>
          </div>
        )}
      </div>
      <div className="w-full bg-gray-50">
        <Footer />
      </div>
    </div>
  );
}
