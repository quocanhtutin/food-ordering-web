import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {

    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`)
        console.log(response.data);

        if (response.data.success) {
            setList(response.data.data);
            console.log("list", list)
        }
        else {
            toast.error("Error")
        }
    }

    const removeFood = async (foodId) => {
        if (confirm("Xác nhận xóa món") == true) {
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
            await fetchList();
            if (response.data.success) {
                toast.success(`Xóa món thành công`)
            }
            else {
                toast.error('Lỗi')
            }
        }

    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div className='list add flex-col'>
            <h3>Danh sách món ăn</h3>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Hình ảnh</b>
                    <b>Tên món</b>
                    <b>Phân loại</b>
                    <b>Giá thành</b>
                    <b>Khác</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className='list-table-format'>
                            <img src={`${url}/images/` + item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List
