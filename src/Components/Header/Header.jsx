import React, { useEffect, useState } from 'react'
import "./Header.css"
import axios from 'axios';
import { Button, Form, Input, Modal, Table } from 'antd';
const Header = () => {
    const [cities,setCities] = useState([]);
    const [open,setOpen] = useState(false)
    const [image,setImage] = useState(null)
    const getCities  = ()=>{
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
        .then(res=>setCities(res.data.data))
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        getCities()
    },[])
    const showModal = () =>{
        setOpen(true)
    }
    const closeModal = () =>{
        setOpen(false)
    }
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
    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('text', values.text);
        formData.append('image',values.image);
    }
    axios({
        url:('https://autoapi.dezinfeksiyatashkent.uz/api/cities'),
        method:"POST",
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`,
        },
        data:FormData,
    })
    .then(res=>{
        console.log(res);
    })
    .catch(err=>console.log(err))
  return (
    <div>
        <Button type='primary' onClick={showModal}>Add</Button>
        <Table columns={columns} dataSource={data}/>
        <Modal open={open} footer={null} onCancel={closeModal}>
            <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span:18,
            }}
            style={{
                maxWidth:900,
            }}
            onFinish={handleSubmit}
            >
                <Form.Item label="Name" name='name'>
                      <Input/>
                </Form.Item>
                <Form.Item label="Text" name='text'>
                      <Input/>
                </Form.Item>
                <Form.Item label="Images" name='images'>
                      <Input type='file'/>
                </Form.Item>
                <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                offset: 8,
                span: 16,
                }}
                 >
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
                </Form.Item>
            </Form>
        </Modal>
    </div>
  )
}

export default Header

