import { useParams, useNavigate } from "react-router";
import { Categories as sections, Items } from "./components/data";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";

const Categories = () => {
  const { category, item } = useParams();
  const navigate = useNavigate();
  const reduxItems = useSelector((state) => state.items.items);
  
  const allItems = [...Items, ...reduxItems];

  return (
    <div>
      {!item && !category && (
        <div className="px-3 py-2">
          <h2 className="font-bold text-3xl my-4">Categories</h2>
          <p className="">Browse our categories at your perusal</p>
          <div>
            {sections.map((cat, index) => (
              <div
                key={index}
              >
                <h3 className="text-2xl font-semibold py-4 px-2">{cat.alt}</h3>
                <div className="flex justify-between md:justify-start items-start overflow-x-auto gap-8 h-fit py-4 overflow-y-hidden mx-6 mt-2">
                  {allItems.filter(
                    (item) =>
                      item.category.toUpperCase() === cat.alt.toUpperCase()
                  )?.map((item, index) => (
                    <div
                      key={`${item.category}-${item.item}-${index}`}
                      className="h-40 w-30 flex flex-col min-h-40 min-w-30"
                      onClick={() => navigate(`${item.category}/${item.item}`)}
                    >
                      <div className="h-[80%] w-full ">
                        <img 
                          src={item.image} 
                          alt={item.alt || item.title}
                          className="h-full min-h-full w-full rounded-sm object-cover"
                        />
                      </div>
                      <div className="text-sm ">{item.title}</div>
                    </div>
                  ))}
                  {allItems.filter(
                    (item) =>
                      item.category.toUpperCase() === cat.alt.toUpperCase()
                  ).length === 0 && (
                    <div className="">There is nothing in this category as of now</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {category && item && <Outlet />}
    </div>
  );
};
export default Categories;
