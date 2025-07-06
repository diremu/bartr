import { useParams } from "react-router";

const Item = () => {
    const { category, item } = useParams();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <p><span>{category}</span> /
        <span>{item}</span></p>
    </div>
  );
};

export default Item;
