import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { url } from '../config';

type FieldType = {
    username?: string;
    password?: string;
};


interface Props {
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginForm = ({ setUser }: Props) => {
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
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>

                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>

                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    未注册用户将自动注册
                </Form.Item>
            </Form >
        </>
    )
};

export default LoginForm;