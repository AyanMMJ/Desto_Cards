import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Calendar,
  Timer,
  Utensils,
  IndianRupee,
  Check,
  X,
} from "lucide-react";

// Animation variant
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const RestaurantCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // 'accepted' or 'rejected'

  const isComplete = order.billStatus.toLowerCase() === "paid";

  const totalAmount = order.items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <motion.div
      className="bg-white shadow-md rounded-3xl p-4 w-full max-w-sm mx-auto border border-gray-200"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold">Order ID: {order.id}</h2>
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              isComplete ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {isComplete ? (
              <Check size={14} className="text-white" />
            ) : (
              <X size={14} className="text-white" />
            )}
          </div>
        </div>

        <div
          className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold transition duration-200 shadow ${
            isComplete
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isComplete ? "Completed" : "Incomplete"}
        </div>
      </div>

      {/* Date */}
      <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
        <Calendar size={16} />
        <p>{order.date}</p>
      </div>

      {/* Table No and Toggle */}
      <div className="flex justify-between items-center text-sm mb-2">
        <div className="flex items-center gap-2 font-semibold">
          <Utensils size={16} />
          <p>Table No: {order.table}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          {/* View Order Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition 
              ${expanded ? "bg-white text-black" : "bg-black text-white"} 
              hover:opacity-90`}
          >
            View Order
          </button>

          {/* Expand Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center gap-2 text-sm font-medium px-1 py-1 rounded-full shadow hover:opacity-90 transition 
              ${expanded ? "bg-white text-black" : "bg-black text-white"}`}
          >
            <ChevronDown
              size={16}
              className={`transform transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <hr className="border-t border-gray-100 my-2" />

      {/* Expandable section */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="max-h-40 overflow-y-auto pr-1 custom-scroll">
              {order.items.map((item, index) => {
                const quantity = item.quantity || 1;
                return (
                  <div
                    key={index}
                    className="flex justify-between border-b border-dashed py-1 text-sm"
                  >
                    <span>
                      {quantity} {item.name}
                    </span>
                    <span className="text-green-700 font-medium">
                      ₹{item.price * quantity}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="flex justify-between items-center text-mx font-medium mb-2 mt-2">
        <span className="text-gray-700">{order.items.length} items</span>
        <div className="flex items-center gap-1 text-md font-bold text-green-700">
          <IndianRupee size={16} />
          {totalAmount}
        </div>
      </div>

      {/* Bottom Row: Bill Status + Accept/Reject Buttons */}
      <div className="mt-4 flex justify-between items-center">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            isComplete
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {order.billStatus}
        </span>

        {/* Accept/Reject Buttons */}
        <div className="flex gap-2">
          {/* Accept Button */}
          <button
            onClick={() => {
              console.log(`Order ${order.id} accepted`);
              setOrderStatus("accepted");
            }}
            className={`w-7 h-7 flex items-center justify-center rounded-full shadow transition
              ${
                orderStatus === "accepted"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-600 hover:bg-green-200"
              }`}
            title="Accept Order"
          >
            <Check size={16} />
          </button>

          {/* Reject Button */}
          <button
            onClick={() => {
              console.log(`Order ${order.id} rejected`);
              setOrderStatus("rejected");
            }}
            className={`w-7 h-7 flex items-center justify-center rounded-full shadow transition
              ${
                orderStatus === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
              }`}
            title="Reject Order"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
