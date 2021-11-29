import {Drawer, Input, Col, Form, Row, Button, Spin} from 'antd';
import {addNewWorkExperience} from "./client";
import {openErrorNotification, openSuccessNotification} from "./Notification";
import {LoadingOutlined} from "@ant-design/icons";
import {useState} from "react";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;    //for loading indicator when submitting new work experience

function WorkDrawerForm({ showDrawer, setShowDrawer, fetchWorkExperiences }) {

    const onCLose = () => setShowDrawer(false);                       //hide the drawer
    const [submitting, setSubmitting] = useState(false);    //state for when submitting new work experience

    const onFinish = work => {
        setSubmitting(true)                                     //setSubmitting status to true
        console.log(JSON.stringify(work, null, 2))

        addNewWorkExperience(work)
            .then(() => {
                    console.log("Work Experience Added")
                    onCLose();                                        //close the form once addNewWorkExperience() success

                    openSuccessNotification("Work Experience Successfully Added",
                        `Work experience at ${work.company} has been added`);
                    fetchWorkExperiences();                           //page reload after work experience is added
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
                setSubmitting(false);                           //after work experience is added, setSubmitting to false
            })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Add New Work Experience"
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
              //hideRequiredMark
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="company"
                        label="Company Name"
                        rules={[{required: true, message: 'Please enter company name'}]}
                    >
                        <Input placeholder="Please enter company name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="jobTitle"
                        label="Job Title"
                        rules={[{required: true, message: 'Please enter job title'}]}
                    >
                        <Input placeholder="Please enter job title"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="workDuration"
                        label="Work Duration"
                        rules={[{required: true, message: 'Please enter work duration'}]}
                    >
                        <Input placeholder="Please enter work duration"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={20}>
                    <Form.Item
                        name="description"
                        label="Work Description"
                        //rules={[{required: true, message: 'Please enter work description'}]}
                    >
                        <Input placeholder="Please enter work description"/>
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

export default WorkDrawerForm;