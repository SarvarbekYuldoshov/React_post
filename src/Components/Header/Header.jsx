import React, { useEffect, useState } from 'react';
import "./Header.css";
import axios from 'axios';
import { Button, Form, Input, Modal, Table, message } from 'antd';

const Header = () => {
    const [cities, setCities] = useState([]);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [form] = Form.useForm();

    const getCities = () => {
        axios.get('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
            .then(res => setCities(res.data.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getCities();
    }, []);

    const showModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        form.resetFields();
        setImage(null);
    };

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('text', values.text);
        formData.append('images', image);

        axios({
            url: 'https://autoapi.dezinfeksiyatashkent.uz/api/cities',
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data: formData
        })
            .then(res => {
                if (res.data.success) {
                    message.success("Qo`shildi");
                    closeModal();
                    getCities();
                }
            })
            .catch(err => {
                console.log(err);
                message.error("xatolik: " + (err.response?.data?.message || "server xatoligi"));
            });
    };

    const handleEdit = (record) => {
        // Handle edit action
    };

    const handleDelete = (record) => {
        // Handle delete action
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: "n",
            dataIndex: 'number',
        },
        {
            title: "Text",
            dataIndex: "text",
        },
        {
            title: "Images",
            dataIndex: "images",
            render: (text, record) => (
                <img width={150} src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${record.image_src}`} alt={record.name} />
            ),
        },
        {
            title: 'Action',
            render: (text, record) => (
                <>
                    <Button type='primary' onClick={() => handleDelete(record)}>Delete</Button>
                    <Button type='primary' danger onClick={() => handleEdit(record)}>Edit</Button>
                </>
            ),
        }
    ];

    const data = cities.map((city, index) => ({
        key: index,
        number: index + 1,
        name: city?.name,
        text: city?.text,
        image_src: city?.image_src,
    }));

    return (
        <div>
            <Button type='primary' onClick={showModal}>Add</Button>
            <Table columns={columns} dataSource={data} />
            <Modal open={open} footer={null} onCancel={closeModal}>
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 900 }}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Name" name='name' rules={[{ required: true, message: 'Please input the name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Text" name='text' rules={[{ required: true, message: 'Please input the text!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Images" name='images' rules={[{ required: true, message: 'Please upload an image!' }]}>
                        <Input type='file' onChange={(e) => setImage(e.target.files[0])} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Header;
