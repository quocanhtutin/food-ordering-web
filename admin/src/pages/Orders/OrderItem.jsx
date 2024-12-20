import React from 'react'
import './OrderItem.css'
import { useContext } from 'react'
import { StoreContext } from '../../../../front-end/src/context/StoreContext';
const OrderItem = ({ name, image, quantity }) => {

    const  url  = "http://localhost:4000";

    return (
        <div className='od-item'>

            <img className='od-item-image' src={url + "/images/" + image} alt={name} />
            <div className='od-item-info'>
                <div className='od-item-name'>{name}</div>
                <div className='od-item-quantity'>Số lượng: <strong>{quantity}</strong></div>
            </div>
        </div>
    )
}

export default OrderItem
