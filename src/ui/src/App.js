import './App.css';
import {
    getAllComments,
    getAllWorkExperiences,
    deleteWorkExperience,
    getAllAcademicExperiences,
    deleteAcademicExperience, getAllEducations, deleteEducation
} from "./client";
import {useState, useEffect} from "react";
import WorkDrawerForm from "./WorkDrawerForm";
import AcademicDrawerForm from "./AcademicDrawerForm";
import {Layout, Menu, Breadcrumb, Divider, Empty, Table, Spin, Button, Image, Space, Badge, Popconfirm, Radio} from 'antd';
import {
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined, LoadingOutlined, PlusOutlined,
} from '@ant-design/icons';
import Avatar from "antd/es/avatar/avatar";
import {openErrorNotification, openSuccessNotification} from "./Notification";
import EducationDrawerForm from "./EducationDrawerForm";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const columns = fetchWorkExperiences => [
  {
    key: 'company',
    title: 'Company',
    dataIndex: 'company'
  },
  {
    key: 'jobTitle',
    title: 'Title',
    dataIndex: 'jobTitle'
  },
  {
    key: 'workDuration',
    title: 'Duration',
    dataIndex: 'workDuration'
  },
  {
    key: 'description',
    title: 'Description',
    dataIndex: 'description'
  },
  {
    key: 'actions',
    title: 'Actions',
    render: (text, work) =>
        <Radio.Group>
          <Popconfirm
              placement='topRight'
              title={`Are you sure to delete the work experience at ${work.company}?`}
              onConfirm={() => removeWorkExperience(work.id, fetchWorkExperiences)}
              okText='Yes'
              cancelText='No'>
            <Radio.Button value="small">Delete</Radio.Button>
          </Popconfirm>
          <Radio.Button value={"small"}>Edit</Radio.Button>
        </Radio.Group>

  }
];

const academicColumns = fetchAcademicExperiences => [
    {
        key: 'institute',
        title: 'Institute',
        dataIndex: 'institute'
    },
    {
        key: 'positionTitle',
        title: 'Position Title',
        dataIndex: 'positionTitle'
    },
    {
        key: 'duration',
        title: 'Duration',
        dataIndex: 'duration'
    },
    {
        key: 'description',
        title: 'Description',
        dataIndex: 'description'
    },
    {
        key: 'actions',
        title: 'Actions',
        render: (text, academic) =>
            <Radio.Group>
                <Popconfirm
                    placement='topRight'
                    title={`Are you sure to delete the academic experience at ${academic.institute}?`}
                    onConfirm={() => removeAcademicExperience(academic.id, fetchAcademicExperiences)}
                    okText='Yes'
                    cancelText='No'>
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button value={"small"}>Edit</Radio.Button>
            </Radio.Group>

    }
];

const educationColumns = fetchEducations => [
    {
        key: 'institute',
        title: 'Institute',
        dataIndex: 'institute'
    },
    {
        key: 'degree',
        title: 'Degree',
        dataIndex: 'degree'
    },
    {
        key: 'duration',
        title: 'Duration',
        dataIndex: 'duration'
    },
    {
        key: 'description',
        title: 'Description',
        dataIndex: 'description'
    },
    {
        key: 'actions',
        title: 'Actions',
        render: (text, education) =>
            <Radio.Group>
                <Popconfirm
                    placement='topRight'
                    title={`Are you sure to delete the education at ${education.institute}?`}
                    onConfirm={() => removeEducation(education.id, fetchEducations)}
                    okText='Yes'
                    cancelText='No'>
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button value={"small"}>Edit</Radio.Button>
            </Radio.Group>

    }
];

//delete work experience
const removeWorkExperience = (workId, callback) => {
  deleteWorkExperience(workId).then(() => {
    openSuccessNotification("Work experience successfully deleted", "Work experience is deleted.");
    callback();
  }).catch(err => {
          console.log(err.response)
          err.response.json().then(res => {
                  console.log(res);
                  openErrorNotification("There was an issue", `${res.message}[${res.status}][${res.error}]`)
              }
          )}
  );
}

//delete academic experience
const removeAcademicExperience = (academicId, callback) => {
    deleteAcademicExperience(academicId).then(() => {
        openSuccessNotification("Academic experience successfully deleted", "Academic experience is deleted.");
        callback();
    }).catch(err => {
        console.log(err.response)
        err.response.json().then(res => {
                console.log(res);
                openErrorNotification("There was an issue", `${res.message}[${res.status}][${res.error}]`)
            }
        )}
    );
}

const removeEducation = (educationId, callback) => {
    deleteEducation(educationId).then(() => {
        openSuccessNotification("Education successfully deleted", "Education is deleted.");
        callback();
    }).catch(err => {
        console.log(err.response)
        err.response.json().then(res => {
                console.log(res);
                openErrorNotification("There was an issue", `${res.message}[${res.status}][${res.error}]`)
            }
        )}
    );
}

function App() {

  const[comments, setComments] = useState([]);                //for retrieving comments data to UI
  const[workExperiences, setWorkExperiences] = useState([]);  //for retrieving work experiences data to UI
  const[academicExperiences, setAcademicExperiences] = useState([]);
  const[educations, setEducations] = useState([]);
  const[collapsed, setCollapsed] = useState(false);
  const[fetching, setFetching] = useState(true);
  const[showDrawer, setShowDrawer] = useState(false);
  const[showAcademicDrawer, setShowAcademicDrawer] = useState(false);
  const[showEducationDrawer, setShowEducationDrawer] = useState(false);


  //retrieve comments from the backend
  const fetchComments = () =>
    getAllComments()
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setComments(data);
          setFetching(false);
        })

  //retrieve work experiences from backend
  const fetchWorkExperiences = () =>
      getAllWorkExperiences()
          .then(res => res.json())  //res.json = Promise object
          .then(data => {           //data = response object
            console.log(data);
            setWorkExperiences(data); //fill the array of workExperiences with response-objects
          })
          .catch( err => {
                console.log(err.response)
                err.response.json().then(res => {
                        console.log(res);
                        openErrorNotification("There was an issue",
                            `${res.message}[${res.status}][${res.error}]`)
                    }
                )
              }
          )
          .finally( () => setFetching(false));

    //retrieve academic experiences from backend
    const fetchAcademicExperiences = () =>
        getAllAcademicExperiences()
            .then(res => res.json())  //res.json = Promise object
            .then(data => {           //data = response object
                console.log(data);
                setAcademicExperiences(data); //fill the array of academicExperiences with response-objects
            })
            .catch( err => {
                    console.log(err.response)
                    err.response.json().then(res => {
                            console.log(res);
                            openErrorNotification("There was an issue",
                                `${res.message}[${res.status}][${res.error}]`)
                        }
                    )
                }
            )
            .finally( () => setFetching(false));

    //retrieve educations from backend
    const fetchEducations = () =>
        getAllEducations()
            .then(res => res.json())  //res.json = Promise object
            .then(data => {           //data = response object
                console.log(data);
                setEducations(data); //fill the array of educations with response-objects
            })
            .catch( err => {
                    console.log(err.response)
                    err.response.json().then(res => {
                            console.log(res);
                            openErrorNotification("There was an issue",
                                `${res.message}[${res.status}][${res.error}]`)
                        }
                    )
                }
            )
            .finally( () => setFetching(false));

  /*run as soon as page loaded*/
  useEffect(() => {
    console.log("component is mounted");
    //fetchComments()
    fetchWorkExperiences();
    fetchAcademicExperiences();
  }, []);

  //shows table of work experiences data
  const renderWorkExperiences = () => {
    if(fetching){
      return <Spin indicator={antIcon} /> //copied from https://ant.design/components/spin/
                                          //when it is fetching students, show loading spin
    }

    if(workExperiences.length <= 0){
      return <>
        <WorkDrawerForm
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            fetchWorkExperiences={fetchWorkExperiences}
        />
        <Empty/>
      </>
    }

    return <>
      <WorkDrawerForm
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          fetchWorkExperiences={fetchWorkExperiences} //providing the fetchWorkExperiences to WorkDrawerForm.js for data refresh once work experience added
      />
      <Table
          dataSource={workExperiences}
          columns={columns(fetchWorkExperiences)}
          bordered
          rowKey={work => work.id}    //rowKey property is needed to ensure unique key prop is used for row selection
      />
    </>;
  }

    //shows table of academic experiences data
    const renderAcademicExperiences = () => {
        if(fetching){
            return <Spin indicator={antIcon} /> //copied from https://ant.design/components/spin/
                                                //when it is fetching students, show loading spin
        }

        if(academicExperiences.length <= 0){
            return <>
                <AcademicDrawerForm
                    showDrawer={showAcademicDrawer}
                    setShowDrawer={setShowAcademicDrawer}
                    fetchAcademicExperiences={fetchAcademicExperiences}
                />
                <Empty/>
            </>
        }

        return <>
            <AcademicDrawerForm
                showDrawer={showAcademicDrawer}
                setShowDrawer={setShowAcademicDrawer}
                fetchAcademicExperiences={fetchAcademicExperiences} //providing the fetchAcademicExperiences to AcademicDrawerForm.js for data refresh once academic experience added
            />
            <Table
                dataSource={academicExperiences}
                columns={academicColumns(fetchAcademicExperiences)}
                bordered
                rowKey={academic => academic.id}    //rowKey property is needed to ensure unique key prop is used for row selection
            />
        </>;
    }

    //shows table of education data
    const renderEducations = () => {
        if(fetching){
            return <Spin indicator={antIcon} /> //copied from https://ant.design/components/spin/
                                                //when it is fetching students, show loading spin
        }

        if(educations.length <= 0){
            return <>
                <EducationDrawerForm
                    showDrawer={showEducationDrawer}
                    setShowDrawer={setShowEducationDrawer}
                    fetchEducations={fetchEducations}/>
                <Empty/>
            </>
        }

        return <>
            <EducationDrawerForm
                showDrawer={showEducationDrawer}
                setShowDrawer={setShowEducationDrawer}
                fetchEducations={fetchEducations} //providing the fetchEducations to EducationDrawerForm.js for data refresh once education added
            />
            <Table
                dataSource={educations}
                columns={educationColumns(fetchEducations)}
                bordered
                rowKey={education => education.id}    //rowKey property is needed to ensure unique key prop is used for row selection
            />
        </>;
    }

  //html page layout
  return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Resume
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Resume</Breadcrumb.Item>
              <Breadcrumb.Item>Conrad Lee</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Space direction="horizontal" style={{margin: '0 0 0 15px'}}>
                    <Avatar
                        size={100}
                        icon={<UserOutlined />}
                        src="https://media-exp1.licdn.com/dms/image/C4E03AQFyjqns_h2D_Q/profile-displayphoto-shrink_800_800/0/1553789415169?e=1641427200&v=beta&t=ZvGzWJV6FWCQgQkswFP78x6bB6-2zahvD3g8wHwCPn8"
                    />
                    <p className="intro-paragraph" style={{margin: '0 0 0 15px'}}>
                        Experienced IT Professional with a demonstrated history of working in the software analysis and support.
                        <br/>Skilled in Java, SQL, Database Management, IBM RPG, Microsoft Office, Electronic Data Interchange (EDI).
                    </p>
                </Space>
              <Divider orientation="left">
                <Space>
                    Work Experiences
                    <Badge
                      className="site-badge-count-109"
                      count={workExperiences.length}
                    />
                </Space>
              </Divider>
                  <Space style={{margin: '0 0 15px 0'}}>
                    <Button
                      onClick={() => setShowDrawer(!showDrawer)}
                      type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                        Add New Work Experience
                    </Button>
                  </Space>
                  {renderWorkExperiences()}
              <Divider orientation="left">
                <Space>
                    Academic Experiences
                    <Badge
                        className="site-badge-count-109"
                        count={academicExperiences.length}
                    />
                </Space>
              </Divider>
              <Space style={{margin: '0 0 15px 0'}}>
                  <Button
                      onClick={() => setShowAcademicDrawer(!showAcademicDrawer)}
                      type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                      Add New Academic Experience
                  </Button>
              </Space>
              {renderAcademicExperiences()}
              <Divider orientation="left"><Space>
                  Education
                  <Badge
                      className="site-badge-count-109"
                      count={educations.length}
                  />
              </Space>
              </Divider>
                <Space style={{margin: '0 0 15px 0'}}>
                    <Button
                        onClick={() => setShowEducationDrawer(!showEducationDrawer)}
                        type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                        Add New Education
                    </Button>
                </Space>
                {renderEducations()}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>

}

export default App;
