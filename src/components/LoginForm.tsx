import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

type FieldType = {
    username?: string;
    password?: string;
};


interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginForm = ({ setOpen, setUser }: Props) => {
    const onFinish = (values: FieldType) => {
        console.log('Success:', values);
        setOpen(false);
        if (values.username) {
            localStorage.setItem('username', values.username);
            setUser(values.username);
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 6 }}
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
        </Form>
    )
};

export default LoginForm;