import { formatMoney } from "../../helper/formatMoney";

const Card = ({ item }) => {
  console.log("item : ", item);
  return <div className="border rounded-md">
    <img src={item?.featuredImage} className="w-full h-[240px] object-cover"></img>
    <div className="p-4">
      <h1 className="text-4xl uppercase text-gray-700">{item?.name}</h1>
      <span className="text-lg font-bold text-yellow-bold-main">{`${formatMoney(item?.price)}`}</span>
    </div>
  </div>;
};

export default Card;
