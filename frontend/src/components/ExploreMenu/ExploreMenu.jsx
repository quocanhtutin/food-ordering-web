import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
    const handleCategoryClick = (menu_name) => {
        setCategory((prev) => {
            let newCategory;
            if (prev.includes(menu_name)) {
                newCategory = prev.filter((cat) => cat !== menu_name);
            } else {
                newCategory = [...prev, menu_name];
            }

            if (newCategory.length > 0 && newCategory.includes('All')) {
                newCategory = newCategory.filter((cat) => cat !== 'All');
            }

            if (newCategory.length === 0) {
                newCategory = ['All'];
            }

            return newCategory;
        });
    };

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Menu</h1>
            <p className='explore-menu-text'>Choose from a variety of categories</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => (
                    <div
                        onClick={() => handleCategoryClick(item.menu_name)}
                        className="explore-menu-list-item"
                        key={index}
                    >
                        <img
                            className={category.includes(item.menu_name) ? 'active' : ''}
                            src={item.menu_image}
                            alt={item.menu_name}
                        />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;