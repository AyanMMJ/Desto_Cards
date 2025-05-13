import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Utensils, IndianRupee, Check, X } from "lucide-react";

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
  const [orderStatus, setOrderStatus] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedReason, setSelectedReason] = useState("");

  const timeOptions = ["5-10min", "10-15min", "15-20min", "20-25min"];
  const rejectReasons = [
    "Not available",
    "Spam",
    "Try again",
    "Pay first",
    "Other",
  ];

  const timeScrollRef = useRef(null);
  const timeItemRefs = useRef({});

  const isComplete = order.billStatus.toLowerCase() === "paid";

  const totalAmount = order.items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleConfirm = () => {
    if (
      (orderStatus === "accepted" && selectedTime) ||
      (orderStatus === "rejected" && selectedReason)
    ) {
      setIsConfirmed(true);
    }
  };

  const resetCard = () => {
    setOrderStatus(null);
    setSelectedTime("");
    setSelectedReason("");
    setIsConfirmed(false);
  };

  return (
    <motion.div
      className="bg-white shadow-md rounded-3xl p-4 w-full max-w-md mx-auto border border-gray-200 relative"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
        <div className="flex items-center gap-2">
          
          <div
            className={`w-2 h-2 rounded-full animate-ping ${
              isComplete ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <h2 className="text-sm font-bold">Order ID: {order.id}</h2>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`px-3 py-1 rounded-full text-sm font-semibold transition outline outline-1 outline-gray-200 ${
            expanded ? "bg-black text-white" : "bg-gray-100 text-black"
          } hover:opacity-90`}
        >
          View Order
        </button>
      </div>

      {/* Date + Accept/Reject Buttons */}
      <div className="flex justify-between items-center mb-2 text-sm text-gray-500 flex-wrap gap-2">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <p>{order.date}</p>
        </div>

        <div className="flex gap-3 mr-3">
          {/* Left Side - Accept or Cancel Rejection */}
          {orderStatus === "rejected" && !isConfirmed ? (
            <div className="flex items-center justify-center w-[50px]">
              <button
                onClick={resetCard}
                className="text-blue-600 text-xs font-medium underline hover:text-blue-700 transition"
              >
                Cancel Rejection
              </button>
            </div>
          ) : (
            (!isConfirmed || orderStatus === "accepted") && (
              <button
                onClick={() => {
                  setOrderStatus("accepted");
                  setSelectedTime("");
                  setSelectedReason("");
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full shadow transition ${
                  orderStatus === "accepted"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-600 hover:bg-green-200"
                }`}
                title="Accept Order"
              >
                <Check size={16} />
              </button>
            )
          )}

          {/* Right Side - Reject or Cancel Acceptance */}
          {orderStatus === "accepted" && !isConfirmed ? (
            <div className="flex items-center justify-center w-[50px]">
              <button
                onClick={resetCard}
                className="text-red-600 text-xs font-medium underline hover:text-red-700 transition"
              >
                Cancel Acceptance
              </button>
            </div>
          ) : (
            (!isConfirmed || orderStatus === "rejected") && (
              <button
                onClick={() => {
                  setOrderStatus("rejected");
                  setSelectedTime("");
                  setSelectedReason("");
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full shadow transition ${
                  orderStatus === "rejected"
                    ? "bg-red-600 text-white"
                    : "bg-red-100 text-red-600 hover:bg-red-200"
                }`}
                title="Reject Order"
              >
                <X size={16} />
              </button>
            )
          )}
        </div>
      </div>

      {/* Table No */}
      <div className="flex justify-between items-center text-sm mb-2">
        <div className="flex items-center gap-2 font-semibold">
          <Utensils size={16} />
          <p>Table No: {order.table}</p>
        </div>
      </div>

      <hr className="border-t border-gray-100 my-2" />

      {/* Expandable Section for Order Items */}
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
            <div className="max-h-40 overflow-y-auto pr-1">
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

      {/* Footer Info */}
      <div className="flex justify-between items-center text-sm font-medium mb-2 mt-2">
        <span className="text-gray-700">{order.items.length} items</span>
        <div className="flex items-center gap-1 text-md font-bold text-green-700">
          <IndianRupee size={16} />
          {totalAmount}
        </div>
      </div>

      {/* Animated Time/Reason + Confirm */}
      <AnimatePresence initial={false}>
        {(orderStatus === "accepted" || orderStatus === "rejected") &&
          !isConfirmed && (
            <motion.div
              key="time-confirm"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden mt-4"
            >
              <div className="flex items-center gap-2">
                <div
                  className="flex gap-2 overflow-x-auto flex-1 hide-scrollbar scroll-smooth"
                  ref={timeScrollRef}
                >
                  {(orderStatus === "accepted"
                    ? timeOptions
                    : rejectReasons
                  ).map((item) => (
                    <button
                      key={item}
                      ref={(el) => (timeItemRefs.current[item] = el)}
                      onClick={() => {
                        if (orderStatus === "accepted") {
                          setSelectedTime(item);
                        } else {
                          setSelectedReason(item);
                        }

                        const container = timeScrollRef.current;
                        const button = timeItemRefs.current[item];

                        if (container && button) {
                          const containerRect =
                            container.getBoundingClientRect();
                          const buttonRect = button.getBoundingClientRect();

                          const scrollLeft =
                            container.scrollLeft +
                            buttonRect.left -
                            containerRect.left -
                            container.clientWidth / 2 +
                            button.offsetWidth / 2;

                          container.scrollTo({
                            left: scrollLeft,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                        (orderStatus === "accepted" && selectedTime === item) ||
                        (orderStatus === "rejected" && selectedReason === item)
                          ? orderStatus === "accepted"
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                          : "bg-amber-50 hover:bg-amber-100 text-black-500"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={
                    (orderStatus === "accepted" && !selectedTime) ||
                    (orderStatus === "rejected" && !selectedReason)
                  }
                  className={`flex-shrink-0 font-semibold py-2 px-4 rounded-xl transition ${
                    orderStatus === "accepted"
                      ? selectedTime
                        ? "bg-green-600 text-green-100 hover:bg-green-600"
                        : "bg-green-200 text-white cursor-not-allowed"
                      : selectedReason
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-green-600 text-white cursor-not-allowed"
                  }`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          )}
      </AnimatePresence>

      {/* Bottom-right status box */}
      {isConfirmed && (
        <div className="mt-4 flex justify-end">
          <div
            className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${
              orderStatus === "accepted"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {orderStatus === "accepted" ? "Confirmed" : "Rejected"}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default RestaurantCard;
