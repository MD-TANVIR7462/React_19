import {  Heart, X } from "lucide-react";
import { use, useState } from "react";

const ActiveAction = ({ data }) => {
  const [selected, setSelected] = useState([]);
  const items = use(data);

  const addItems = (item) => {
    setSelected((prev) => [...prev, item]);
  };

  const removeItem = (id) => {
    const item = selected.filter((s) => s.id !== id);

    setSelected((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="my-8 ">
      <p className="text-2xl font-semibold text-blue-900">Active Actions</p>
      <p className="text-gray-400 font-medium">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, quam!
      </p>
      <div className=" grid grid-cols-4 items-start gap-4 justify-center my-5">
        <div className="w-full overflow-y-auto col-span-3 rounded-2xl bg-gray-300/5">
          <table className="w-full ">
            <thead className="h-14">
              <tr className="border-b ">
                <th className=" px-4 py-2 text-left font-bold ">Items</th>
                <th className=" px-4 py-2 text-left font-bold ">Current Bid</th>
                <th className=" px-4 py-2 text-left font-bold ">Time Left</th>
                <th className=" px-4 py-2 text-left font-bold ">Bid Now</th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((item) => {
                  return (
                    <tr key={item.id} className="border-b ">
                      <td className=" px-4 py-2 text-left ">
                        <img src={item?.image} alt="" className="w-14 h-12 rounded-xs" />
                      </td>
                      <td className=" px-4 py-2 text-left ">{item.currentBidPrice}</td>
                      <td className=" px-4 py-2 text-left ">{item.timeLeft}</td>
                      <td className=" px-4 py-2  text-center ">
                        <Heart
                          className={`cursor-pointer text-red-500 `}
                          fill={selected.some((s) => s.id === item.id) ? "currentcolor" : "none"}
                          onClick={(e) => {
                            e.stopPropagation();
                            addItems(item);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="col-span-1 text-center rounded-lg bg-gray-300/5 ">
          <p className="border-b  text-blue-900 font-semibold text-2xl mt-4 pb-2">Favourite Items</p>

          {selected.length !== 0 ? (
            selected.map((singleSelectedData) => {
              return (
                <div className="p-4 flex justify-between " key={singleSelectedData.id}>
                  <div className="flex gap-5 items-center">
                    <img className="w-20 h-16 " src={singleSelectedData.image} alt="" />
                    <div className="text-start">
                      <p className="truncate">{singleSelectedData.title}</p>
                      <div className="flex gap-5">
                        <p>${singleSelectedData.currentBidPrice}</p>
                        <p>Bids : {singleSelectedData.bidsCount}</p>
                      </div>
                    </div>
                  </div>
                  <X
                    className="w-5 h-5 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(), removeItem(singleSelectedData.id);
                    }}
                  />
                </div>
              );
            })
          ) : (
            <div className="p-5">
              <p className="font-bold  mb-3">No Favorites yet</p>
              <p className="px-12 text-gray-500 ">Click the heart icon on any item to add it to your favorites.</p>
            </div>
          )}

          <div className="flex items-center  justify-between p-5 border-t mt-5">
            <p className="font-semibold ">Total Bids AMount </p>
            <p>${selected.reduce((acc, item) => acc + item.currentBidPrice, 0)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveAction;

