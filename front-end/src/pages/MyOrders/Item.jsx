import React, { useContext } from 'react';
import './Item.css';
import { StoreContext } from '../../context/StoreContext';

const Item = ({ name, image, price ,quantity}) => {
    const { url } = useContext(StoreContext);

    return (
        <div className='item'>
                <img className='item-image' src={url + "/images/" + image} alt={name} />
            <div className='item-info'>
                <div className='item-name-quantity'>
                    <div className='item-name'>{name}</div>
                    <div className="item-quantity">x{quantity }</div>
                </div>
                <div className='item-price'>{quantity * price} đ</div>
            </div>
        </div>
    );
};

export default Item;
