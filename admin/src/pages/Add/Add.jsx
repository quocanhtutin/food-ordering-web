import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({ url }) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "PHỞ - BÁNH CANH - HỦ TIẾU"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "PHỞ - BÁNH CANH - HỦ TIẾU"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Thêm hình ảnh</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Tên món ăn</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Tên món' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Mô tả món ăn</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Thêm mô tả' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Phân loại món ăn</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="PHỞ - BÁNH CANH - HỦ TIẾU">PHỞ - BÁNH CANH - HỦ TIẾU</option>
                            <option value="CƠM - CHÁO">CƠM - CHÁO</option>
                            <option value="GỎI NỘM - MÓN CUỐN">GỎI NỘM - MÓN CUỐN</option>
                            <option value="CÁC MÓN BÁNH">CÁC MÓN BÁNH</option>
                            <option value="CÁC MÓN BÚN">CÁC MÓN BÚN</option>
                            <option value="HEO - BÒ - GÀ">HEO - BÒ - GÀ</option>
                            <option value="CANH">CANH</option>
                            <option value="ĐỒ UỐNG">ĐỒ UỐNG</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Giá sản phẩm</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='50000đ' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>Thêm món</button>
            </form>
        </div>
    )
}

export default Add
