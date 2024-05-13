import type { FormProps } from 'antd';
import { Alert, Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { url } from '../config';
import { useState } from 'react';

type FieldType = {
    username?: string;
    password?: string;
};


interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginForm = ({ setOpen, setUser }: Props) => {
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: FieldType) => {
        if (values.username) {
            const res = await axios.post(url + '/login', values);
            console.log(res.data);
            if (res.data.hasError) {
                messageApi.open({
                    type: 'error',
                    content: res.data.message,
                });
            } else {
                messageApi.open({
                    type: 'success',
                    content: res.data.message,
                });
                localStorage.setItem('username', values.username);
                setUser(values.username);
            }
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {contextHolder}
            < Form
                name="basic"
                labelCol={{ span: 6 }
                }
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>

                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>

                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    unregistered user will be registered automatically
                </Form.Item>
            </Form >
        </>
    )
};

export default LoginForm;