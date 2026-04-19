import React, { useContext, useEffect, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

const FoodDisplay = ({ category }) => {
  const { fetchFoodList, food_list } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFoodItems = async () => {
      // Set loading to true before fetching
      setLoading(true);

      await fetchFoodList();

      // Set loading to false after fetching
      setLoading(false);
    };

    loadFoodItems();
  }, [fetchFoodList]);

  return (
    <div className="food-display" id="food-display">
      <h2>Best dishes in your vicinity</h2>
      <p className="food-display-subtitle">Explore top-rated delicacies crafted with passion and delivered fresh to you! 🍲✨</p>
      <div className="food-display-list">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : food_list && food_list.length > 0
          ? food_list.map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                );
              }
              return null;
            })
          : <div>No food items available</div>}
      </div>
    </div>
  );
};

export default FoodDisplay;
