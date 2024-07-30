import React, { useEffect, useState } from 'react'
import "./Header.css"
import axios from 'axios';
import { Button, Form, Input, Modal, Table } from 'antd';
const Header = () => {
    const [cities,setCities] = useState([]);
    const [open,setOpen] = useState(false)
    const getCities  = ()=>{
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
        .then(res=>setCities(res.data.data))
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        getCities()
    },[])
    const columns = [
        { 
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title:"Text",
            dataIndex:"text"
        },
        {
            title:"Images",
            dataIndex:"images"
        },
        {
            title: 'Action',
            dataIndex:'car'
        }
    ]
    const data = cities.map((city,index)=>(
        {
            key:index,
            number:index+1,
            name:city.name,
            text:city.text,
            images:(<img width={150} src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${city.image_src}`}/>),
            car:(<><Button type='primary' primary>Delete</Button> <Button type='primary' danger>Edit</Button></>)
        }
    ))
  return (
    <div>
        <Button type='primary'>Add</Button>
        <Table columns={columns} dataSource={data}/>
        <Modal open={open}>
            <Form>
                <Form.Item label="Name" name='name'>
                      <Input/>
                </Form.Item>
            </Form>
        </Modal>
    </div>
  )
}

export default Header

