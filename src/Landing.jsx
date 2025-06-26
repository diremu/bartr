import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { Items, Categories, Testimonials } from "./components/data";
import {FeaturesCard} from "./components/FeaturesCard"

export default function Landing() {
  const imgUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB9TxmopJZytwUCJUiPSVwGKGBUN35kGNQ9nTZ0QCeZL2GDs-8Rm3yuwK9uTiy1XM2fchfQRrWc_28tvjaxB82rPJ0qAclVCUGCim3nOcto0bvjw4ddwkcOHyuE08I_M0EFS9GLACaBCU1aOBpzcRhbMYiy65p5LrUJvFaCdMvamZs1SfS--T3c2r5uGwUuaGavDQskVvMFF2-OBJP7zkLJ6OqibgfRKky4uGBX4VNuqN98c45P7efWhYXijdbNyHwfIUvzuR7Hsn8";
  return (
    <div className="w-screen max-w-full h-screen">
      <Navbar />
      <div className="flex flex-col items-center h-full">
        <div className="p-6 w-full max-w-4xl">
          <img
            className="w-full h-80 object-cover bg-center bg-no-repeat bg-cover rounded-xl"
            src={imgUrl}
          />
        </div>
        <div className="md:w-[68%]">
          <div className="flex flex-col justify-start gap-4">
            <h2 className="font-semibold text-xl">Featured Items</h2>
            <div className="flex gap-2">
              {Items.map((item, index) => (
                <Card
                  key={index}
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-start gap-4 mt-8">
            <h2 className="font-semibold text-xl">Popular Categories</h2>
            <div className="flex gap-2">
              {Categories.map((data, index) => (
                <Card key={index} type="category" image={data.image} title={data.title} />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-start gap-4 my-8">
            <h2 className="font-semibold text-xl">User Testimonials</h2>
            <div className="flex gap-2">
              {Testimonials.map((data, index) => (
                <Card key={index} type="testimony" image={data.image} title={data.title} subtitle={data.subtitle} />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-3xl font-bold">Why Choose Bartr?</h3>
            <p className="mt-4 font-[450]">Bartr provides a trusted and efficient marketplace for exchanging items with cash adjustments.</p>
            <p  className="mb-6 font-[450]">Our platform ensures secure transactions, fair value assessments, and convenient logistics, <br/> making it easier than ever to upgrade your belongings.</p>
          </div>
          <div className="flex flex-row gap-3 ">

          </div>
        </div>
      </div>
    </div>
  );
}
