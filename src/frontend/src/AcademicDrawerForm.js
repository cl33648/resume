import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {addNewAcademicExperience} from "./client";
import {openErrorNotification, openSuccessNotification} from "./Notification";
import {LoadingOutlined} from "@ant-design/icons";
import {useState} from "react";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;    //for loading indicator when submitting new academic experience

function AcademicDrawerForm({ showDrawer, setShowDrawer, fetchAcademicExperiences }) {

    const onCLose = () => setShowDrawer(false);                       //hide the drawer
    const [submitting, setSubmitting] = useState(false);    //state for when submitting new academic experience

    const onFinish = academic => {
        setSubmitting(true)                                     //setSubmitting status to true
        console.log(JSON.stringify(academic, null, 2))

        addNewAcademicExperience(academic)
            .then(() => {
                    console.log("Academic Experience Added")
                    onCLose();                                        //close the form once addNewAcademicExperience() success

                    openSuccessNotification("Academic Experience Successfully Added",
                        `Academic experience at ${academic.institute} has been added`);
                    fetchAcademicExperiences();                           //page reload after academic experience is added
                }
            ).catch(err => {
                console.log(err)
                err.response.json().then(res => {
                    console.log(res);
                    openErrorNotification("There was an issue",
                    `${res.message}[${res.status}][${res.error}]`,
                    "bottomLeft")
            });
        }).finally(() => {
            setSubmitting(false);                           //after academic experience is added, setSubmitting to false
        })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Add New Academic Experience"
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
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="institute"
                        label="Institute Name"
                        rules={[{required: true, message: 'Please enter institute name'}]}
                    >
                        <Input placeholder="Please enter institute name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="positionTitle"
                        label="Position Title"
                        rules={[{required: true, message: 'Please enter position title'}]}
                    >
                        <Input placeholder="Please enter position title"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="duration"
                        label="Duration"
                        rules={[{required: true, message: 'Please enter duration'}]}
                    >
                        <Input placeholder="Please enter duration"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={20}>
                    <Form.Item
                        name="description"
                        label="Description"
                        //rules={[{required: true, message: 'Please enter description'}]}
                    >
                        <Input placeholder="Please enter description"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon} />}
            </Row>
        </Form>
    </Drawer>
}

export default AcademicDrawerForm;