import React, { useState } from "react";
import RestaurantCard from "./components/RestaurantCardView";

const sampleOrders = [
  {
    id: "ORD001",
    date: "1:30 PM, 10 Feb, 2025",
    table: "T1",
    waitingTime: "12-15min",
    billStatus: "Paid",
    items: [
      { name: "Paneer Tikka", price: 180, quantity: 2 },
      { name: "Butter Naan", price: 40, quantity: 3 },
    ],
  },
  {
    id: "ORD002",
    date: "2:00 PM, 10 Feb, 2025",
    table: "T2",
    waitingTime: "15-20min",
    billStatus: "Pending",
    items: [
      { name: "Chicken Biryani", price: 220, quantity: 1 },
      { name: "Raita", price: 30, quantity: 1 },
      { name: "Tandoori Chicken", price: 250, quantity: 2 },
    ],
  },
  {
    id: "ORD003",
    date: "2:30 PM, 10 Feb, 2025",
    table: "T3",
    waitingTime: "10-15min",
    billStatus: "Not Paid",
    items: [{ name: "Veg Pulao", price: 150, quantity: 1 }],
  },
  {
    id: "ORD004",
    date: "3:00 PM, 10 Feb, 2025",
    table: "T4",
    waitingTime: "25-30min",
    billStatus: "Paid",
    items: [
      { name: "Chicken Roll", price: 90, quantity: 2 },
      { name: "Cold Drink", price: 40, quantity: 2 },
      { name: "French Fries", price: 80, quantity: 1 },
      { name: "Ice Cream", price: 50, quantity: 3 },
    ],
  },
  {
    id: "ORD005",
    date: "3:30 PM, 10 Feb, 2025",
    table: "T5",
    waitingTime: "20-25min",
    billStatus: "Pending",
    items: [
      { name: "Mutton Rogan Josh", price: 250, quantity: 1 },
      { name: "Tandoori Roti", price: 30, quantity: 4 },
    ],
  },
  {
    id: "ORD006",
    date: "4:00 PM, 10 Feb, 2025",
    table: "T6",
    waitingTime: "15-20min",
    billStatus: "Not Paid",
    items: [
      { name: "Cheese Pizza", price: 200, quantity: 1 },
      { name: "Garlic Bread", price: 100, quantity: 2 },
    ],
  },
  {
    id: "ORD007",
    date: "4:30 PM, 10 Feb, 2025",
    table: "T7",
    waitingTime: "18-22min",
    billStatus: "Paid",
    items: [
      { name: "Chole Bhature", price: 100, quantity: 2 },
      { name: "Lassi", price: 50, quantity: 2 },
    ],
  },
  {
    id: "ORD008",
    date: "5:00 PM, 10 Feb, 2025",
    table: "T8",
    waitingTime: "22-28min",
    billStatus: "Pending",
    items: [
      { name: "Fish Curry", price: 280, quantity: 1 },
      { name: "Rice", price: 60, quantity: 2 },
      { name: "Salad", price: 40, quantity: 1 },
    ],
  },
  {
    id: "ORD009",
    date: "5:30 PM, 10 Feb, 2025",
    table: "T9",
    waitingTime: "10-12min",
    billStatus: "Not Paid",
    items: [
      { name: "Dosa", price: 70, quantity: 2 },
      { name: "Sambar", price: 30, quantity: 1 },
      { name: "Chutney", price: 20, quantity: 1 },
      { name: "Filter Coffee", price: 25, quantity: 2 },
    ],
  },
  {
    id: "ORD010",
    date: "6:00 PM, 10 Feb, 2025",
    table: "T10",
    waitingTime: "12-15min",
    billStatus: "Paid",
    items: [
      { name: "Veg Manchurian", price: 160, quantity: 1 },
      { name: "Hakka Noodles", price: 120, quantity: 1 },
    ],
  },
];

function App() {
  const [filter, setFilter] = useState("All");

  const filteredOrders = sampleOrders.filter((order) => {
    if (filter === "Completed") return order.billStatus === "Paid";
    if (filter === "Incomplete") return order.billStatus !== "Paid";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Restaurant Orders
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {["Order Queue", "Completed", "Incomplete"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === status
                ? "bg-orange-500 text-white"
                : "bg-white border border-orange-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6">
            {filteredOrders
              .filter((_, index) => index % 3 === colIndex)
              .map((order) => (
                <RestaurantCard key={order.id} order={order} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
