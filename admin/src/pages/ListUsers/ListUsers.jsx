import React, { useEffect } from 'react'
import './ListUsers.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const ListUsers = ({ url }) => {

    const [data, setData] = useState([])

    const fetchAllUsers = async () => {
        const response = await axios.get(url + `/api/user/listUsers`);

        if (response.data.success) {
            setData(response.data.data)
            console.log(response.data.data);

        }
        else {
            toast.error("Lỗi lấy danh sách tài khoản thành viênviên")
        }
    }

    const removeUser = async (userId) => {
        if (confirm(`Xác nhận xóa tài khoản`) == true) {
            const response = await axios.post(url + `/api/user/deleteUser`, { id: userId })
            await fetchAllUsers()
            if (response.data.success) {
                toast.success('Xóa tài khoản thành công')
            }
            else {
                toast.error('Lỗi')
            }
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <div className='list add flex-col'>
            <h3>Danh sách tài khoản</h3>
            <div className='list-table'>
                <div className="list-table-format-user title-user">
                    <b>Họ tên thành viên</b>
                    <b>Email</b>
                    <b>Số điện thoại</b>
                    <b>Khác</b>
                </div>
                {
                    data.map((item, index) => {
                        return (
                            <div key={index} className='list-table-format-user'>
                                <p>{item.name}</p>
                                <p>{item.email}</p>
                                <p></p>
                                <p onClick={() => removeUser(item._id)} className='cursor'>X</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ListUsers
