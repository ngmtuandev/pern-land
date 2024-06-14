import { formatMoney } from "../../helper/formatMoney";
import icons from "../../utils/icons";
const Card = ({ item }: any) => {
  const { FaBath, FaBed, FaUser, IoMdContacts } = icons;
  return (
    <div className="border sm:w-screen md:w-full rounded-md p-4">
      <img
        src={item?.featuredImage}
        className="md:w-full w-full object-cover"
      ></img>
      <div className="">
        <h1 className="text-xl h-20 uppercase font-semibold text-gray-700">
          {item?.name}
        </h1>
        <span className="text-lg font-bold text-yellow-bold-main">{`$ ${formatMoney(
          item?.price
        )}`}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center gap-2">
          <div>
            <FaBath></FaBath>
          </div>
          {item?.bathRoom > 0 ? (
            <span className="font-semibold">{item?.bathRoom}</span>
          ) : (
            <span className="font-semibold">Đang cập nhập</span>
          )}
        </div>
        <div className="flex justify-center items-center gap-2">
          <div>
            <FaBed></FaBed>
          </div>
          {item?.bathRoom > 0 ? (
            <span className="font-semibold">{item?.bedRoom}</span>
          ) : (
            <span className="font-semibold">Đang cập nhập</span>
          )}
        </div>
      </div>
      <div className="flex mb-2 justify-between items-center">
        <div className="mt-2 gap-2 flex items-center">
          <div className="">
            {item?.refOwner?.avatar ? (
              <img src={item?.refOwner?.avatar}></img>
            ) : (
              <FaUser size={18}></FaUser>
            )}
          </div>
          <span>{item?.refOwner?.name}</span>
          <div className="w-16 h-7 flex justify-center items-center text-white font-semibold rounded-sm bg-yellow-bold-main">
            <span>Owner</span>
          </div>
        </div>
        <div className="w-10 h-10 cursor-pointer hover:bg-yellow-bold-main flex justify-center items-center text-gray-800 bg-gray-200 rounded-sm">
          <IoMdContacts size={30}></IoMdContacts>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="mt-2 gap-2 flex items-center">
          <div className="">
            {item?.refUser?.avatar ? (
              <img src={item?.refUser?.avatar}></img>
            ) : (
              <FaUser size={18}></FaUser>
            )}
          </div>
          <span>{item?.refUser?.name}</span>
          <div className="w-16 h-7 flex justify-center items-center text-white font-semibold rounded-sm bg-red-600">
            <span>Agent</span>
          </div>
        </div>
        <div className="w-10 h-10 flex justify-center cursor-pointer hover:bg-yellow-bold-main items-center text-gray-800 bg-gray-200 rounded-sm">
          <IoMdContacts size={30}></IoMdContacts>
        </div>
      </div>
    </div>
  );
};

export default Card;
