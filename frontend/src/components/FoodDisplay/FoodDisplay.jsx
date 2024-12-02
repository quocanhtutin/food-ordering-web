import React from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { useContext } from 'react';
const FoodDisplay = ({ category }) => {

  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Chọn món ngay</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category.includes('All') || category.includes(item.category))
            return <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
