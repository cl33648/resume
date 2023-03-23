import {Drawer, Input, Col, Select, Form, Row, Button, Spin, Checkbox} from 'antd';
import {login} from "./client";
import {openErrorNotification, openSuccessNotification} from "./Notification";
import {LoadingOutlined} from "@ant-design/icons";
import {useState} from "react";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;    //for loading indicator when submitting cred

function LoginForm({ showDrawer, setShowDrawer }) {

    const onCLose = () => setShowDrawer(false);                       //onClose() function for hiding the drawer
    const [submitting, setSubmitting] = useState(false);    //state for when submitting credentials

    const onFinish = (credentials) => {
        setSubmitting(true)                                     //setSubmitting status to true

        console.log(JSON.stringify(credentials, null, 2))

        login(credentials)
            .then(() => {
                console.log("Login Success")
            })
            .catch(err => {
                console.log(err)
            })

        setSubmitting(false);                                   //after login is performed, setSubmitting back to false
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
                title="Login"
                width={720}
                onClose={onCLose}
                visible={showDrawer}
                bodyStyle={{paddingBottom: 80}}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onCLose} style={{marginRight: 8}}>
                            Cancel
                        </Button>
                    </div>
                }
    >
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </Drawer>
}

export default LoginForm;