import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
const FoodItem = ({ key, id, name, description, price, image }) => {
    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img src={image} alt="" className="food-item-image" />
            </div>
            <div className="food-item-info">
                <div className="food-item-image-rating">
                    <p>{name}</p>
                    <img src ={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-des">{description}</p>
                <p className="food-item-price">{price }</p>
            </div>
        </div>
    )
}

export default FoodItem
