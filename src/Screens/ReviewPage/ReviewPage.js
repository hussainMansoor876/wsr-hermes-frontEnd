import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import Loader from '../../Components/Loader';
import logo from '../../assets/images/logo-dark.png';
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import dataCountry from '../../country'
import validator from 'validator'
import { toast } from 'react-toastify';
import axios from 'axios'
import { Form, Icon, Input, Button, Upload, Descriptions, Select, DatePicker, message, Menu, Table, Skeleton, Badge } from 'antd';
import Iframe from 'react-iframe'

const { Option } = Select
const { Dragger } = Upload

const expandedRowRender = record => <p>Hello</p>;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
}

class Review extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            city: [],
            isData: true,
            allData: [],
            viewForm: null,
            edit: false,
            columns: [
                {
                    title: 'Client',
                    dataIndex: 'headline',
                    render: text => <Link>{text.clientName > 30 ? `${text.clientName(0, 30)}...` : text.clientName}</Link>
                },
                {
                    title: 'Sold Price',
                    dataIndex: 'status',
                },
                {
                    title: 'Agent Id',
                    dataIndex: 'author',
                },
                {
                    title: 'Date',
                    dataIndex: 'date'
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    render: (v) => <div>
                        <Button onClick={() => this.setState({ viewForm: v })} type="secondary" style={{ marginBottom: 5 }} block>
                            Detail
                            </Button>
                        <Button type="primary" block>
                            Approve
                            </Button>
                    </div>
                }
            ]
        }
    }

    async componentWillMount() {
        const { allData } = this.state
        await axios.get('https://wsr-server.herokuapp.com/subform/getAll')
            .then((res) => {
                const { data } = res.data
                data.map((v, i) => {
                    return allData.push({
                        key: i,
                        headline: v,
                        status: v.soldPrice,
                        author: v.agentId,
                        date: v.timestamp,
                        action: v
                    })
                })
                this.setState({ allData, isData: allData.length ? true : false })
            })
            .catch((err) => console.log(err))
    }

    handleSubmit = e => {
        const { city } = this.state
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (!validator.isAlpha(values.clientName)) {
                    return toast.error("Client Name Must be an alphabet!!!");
                }
                else if (!validator.isAlphanumeric(values.title)) {
                    return toast.error("Title Must be an alphaNumeric!!!");
                }
                values.city = city[values.city]
                // this.setState({ loading: true, disable: true })
                var formData = new FormData();
                for (var i in values) {
                    formData.append(i, values[i])
                }
                formData.append('upload', values.upload[0].originFileObj)
                console.log('form', formData)
                axios.post('https://wsr-server.herokuapp.com/subform/submission', formData)
                    .then((result) => {
                        console.log('result', result)
                        if (result.data.success) {
                            window.location.reload()
                        }
                        else {
                            this.setState({ loading: false, disable: false })
                            toast.error(result.data.message)
                        }
                    })
                    .catch((err) => {
                        toast.error("Something Went Wrong!!!")
                    })
            }
        });
    };

    formEdit() {
        const { setFieldsValue } = this.props.form
        this.setState({ edit: true })
        setFieldsValue({
            agentId: 'hello'
        })
    }


    render() {
        const { city, allData, columns, isData, viewForm, edit } = this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Header {...this.props} />
                <div style={{ backgroundColor: '#E5E5E5' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'ceenter', paddingTop: 20 }}>
                        {!viewForm && !edit ? <div style={{ width: '100%', justifyContent: 'center', display: 'flex', textAlign: 'center' }}>
                            <Table
                                style={{ width: '94%' }}
                                columns={columns}
                                bordered={true}
                                HasData={isData}
                                dataSource={allData}
                                loading={allData.length ? false : true}
                                tableLayout={'fixed'}
                            />
                        </div> :
                            viewForm && !edit ? <Descriptions bordered column={1} style={{
                                backgroundColor: '#fff',
                                width: '60%',
                                marginBottom: 20
                            }}>
                                <Descriptions.Item span={2}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Button onClick={() => this.formEdit()}>Edit</Button>
                                    </div>
                                </Descriptions.Item>
                                <Descriptions.Item label="AgentId">{viewForm.agentId}</Descriptions.Item>
                                <Descriptions.Item label="Client Name">{viewForm.clientName}</Descriptions.Item>
                                <Descriptions.Item label="Street Address">{viewForm.streetAddress}</Descriptions.Item>
                                <Descriptions.Item label="Country">{viewForm.country}</Descriptions.Item>
                                <Descriptions.Item label="City">{viewForm.city}</Descriptions.Item>
                                <Descriptions.Item label="Lender">{viewForm.lender}</Descriptions.Item>
                                <Descriptions.Item label="Title Company">{viewForm.title}</Descriptions.Item>
                                <Descriptions.Item label="Sold Price">{viewForm.soldPrice}</Descriptions.Item>
                                <Descriptions.Item label="Sale Type">{viewForm.saleType}</Descriptions.Item>
                                <Descriptions.Item label="Transaction Fee">{viewForm.transactionFee}</Descriptions.Item>
                                <Descriptions.Item label="Check Recieved">{viewForm.checkRec}</Descriptions.Item>
                                <Descriptions.Item label="Paid Amount">{viewForm.paidAmount}</Descriptions.Item>
                                <Descriptions.Item label="Date">{viewForm.paidDate}</Descriptions.Item>
                            </Descriptions> :
                                <div className="card1">
                                    <div>
                                        <Form onSubmit={this.handleSubmit} className="login-form">
                                            <h1 className="heading1" >Review Submission Form</h1>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(50% - 3px)', marginRight: 6 }}
                                            >
                                                {getFieldDecorator('agentId', {
                                                    initialValue: viewForm.agentId,
                                                    rules: [{ required: true, message: 'Please input your First Name!' }],
                                                })(
                                                    <Input
                                                        minLength={3}
                                                        type="text"
                                                        placeholder="Agent Id"
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(50% - 3px)' }}
                                            >
                                                {getFieldDecorator('clientName', {
                                                    initialValue: viewForm.clientName,
                                                    rules: [{ required: true, message: 'Please input your Last Name!' }],
                                                })(
                                                    <Input
                                                        type="text"
                                                        minLength={3}
                                                        placeholder="Client Name"
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item className="sign-up">
                                                {getFieldDecorator('streetAddress', {
                                                    initialValue: viewForm.streetAddress,
                                                    rules: [{ required: true, message: 'Please input your username!' }],
                                                })(
                                                    <Input
                                                        style={{ backgroundColor: '#FCFCFC' }}
                                                        minLength={10}
                                                        placeholder="Street Address"
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(50% - 3px)', marginRight: 6 }}
                                            >
                                                {getFieldDecorator('country', {
                                                    initialValue: viewForm.country,
                                                    rules: [{ required: true, message: 'Please Select Your Country!' }],
                                                })(
                                                    <Select
                                                        showSearch
                                                        style={{ backgroundColor: '#fff' }}
                                                        placeholder="Select a Country"
                                                        optionFilterProp="children"
                                                        onSelect={(e) => this.setState({ city: dataCountry[e] })}
                                                        filterOption={(input, option) =>
                                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        {
                                                            Object.keys(dataCountry).map((v, i) => {
                                                                return <Option value={v} key={i}>{v}</Option>
                                                            })
                                                        }
                                                    </Select>,
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(50% - 3px)' }}
                                            >
                                                {getFieldDecorator('city', {
                                                    initialValue: viewForm.city,
                                                    rules: [{ required: true, message: 'Please Select Your City!' }],
                                                })(
                                                    <Select
                                                        showSearch
                                                        style={{ backgroundColor: '#fff' }}
                                                        placeholder="Select a city"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        {
                                                            city.map((v, i) => {
                                                                return <Option city={v} key={i}>{v}</Option>
                                                            })
                                                        }
                                                    </Select>,
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(50% - 3px)', marginRight: 6 }}
                                            >
                                                {getFieldDecorator('lender', {
                                                    initialValue: viewForm.lender,
                                                    rules: [{ required: true, message: 'Please input your First Name!' }],
                                                })(
                                                    <Input
                                                        minLength={3}
                                                        type="text"
                                                        placeholder="Lender"
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(50% - 3px)' }}
                                            >
                                                {getFieldDecorator('title', {
                                                    initialValue: viewForm.title,
                                                    rules: [{ required: true, message: 'Please input your Last Name!' }],
                                                })(
                                                    <Input
                                                        type="text"
                                                        minLength={3}
                                                        placeholder="Title Company"
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(50% - 3px)', marginRight: 6 }}
                                            >
                                                {getFieldDecorator('soldPrice', {
                                                    initialValue: viewForm.soldPrice,
                                                    rules: [{ required: true, message: 'Please input your First Name!' }],
                                                })(
                                                    <Input
                                                        type="number"
                                                        placeholder="Sold Price"
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(50% - 3px)' }}
                                            >
                                                {getFieldDecorator('saleType', {
                                                    initialValue: viewForm.saleType,
                                                    rules: [{ required: true, message: 'Please input your Last Name!' }],
                                                })(
                                                    <Input
                                                        type="text"
                                                        minLength={3}
                                                        placeholder="Sale Type"
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(50% - 3px)', marginRight: 6 }}
                                            >
                                                {getFieldDecorator('transactionFee', {
                                                    initialValue: viewForm.transactionFee,
                                                    rules: [{ required: true, message: 'Please input your First Name!' }],
                                                })(
                                                    <Input
                                                        type="number"
                                                        placeholder="Transaction Fee"
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(50% - 3px)' }}
                                            >
                                                {getFieldDecorator('checkRec', {
                                                    initialValue: viewForm.checkRec,
                                                    rules: [{ required: true, message: 'Please input your Last Name!' }],
                                                })(
                                                    <Input
                                                        type="text"
                                                        placeholder="Check Recieved"
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(50% - 3px)', marginRight: 6 }}
                                            >
                                                {getFieldDecorator('paidAmount', {
                                                    initialValue: viewForm.paidAmount,
                                                    rules: [{ required: true, message: 'Please input your First Name!' }],
                                                })(
                                                    <Input
                                                        type="number"
                                                        placeholder="Paid Amount"
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(50% - 3px)' }}
                                            >
                                                {getFieldDecorator('paidDate', {
                                                    initialValue: viewForm.paidDate,
                                                    rules: [{ required: true, message: 'Please input your Last Name!' }],
                                                })(
                                                    <DatePicker style={{ width: '100%' }} />,
                                                )}
                                            </Form.Item>
                                            <Form.Item className="sign-up">
                                                {getFieldDecorator('upload', {
                                                    valuePropName: 'fileList',
                                                    getValueFromEvent: this.normFile,
                                                })(
                                                    <Dragger {...props}>
                                                        <p className="ant-upload-drag-icon">
                                                            <Icon type="inbox" />
                                                        </p>
                                                        <p className="ant-upload-text">File Upload</p>
                                                        <p className="ant-upload-hint">
                                                            Drag and drop a file here or click
                                                </p>
                                                    </Dragger>,
                                                )}
                                            </Form.Item>

                                            <Form.Item className="sign-up">
                                                <Button htmlType="submit" disabled={this.state.disable} style={{ backgroundColor: '#120894', color: 'white', fontWeight: 'bold', fontSize: 14, height: 40, display: 'flex', width: '100%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                                                    Update
                                        </Button>
                                                <Button style={{ fontWeight: 'bold', fontSize: 14, height: 40, display: 'flex', width: '100%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', marginTop: 10 }}>
                                                    Cancel
                                        </Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>}
                    </div>
                </div>
            </div>
        )
    }
}

const ReviewForm = Form.create({ name: 'normal_login' })(Review);

const mapStateToProps = (state) => {
    console.log("mapToState", state.authReducer)
    return {
        user: state.authReducer.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (user) => dispatch(loginUser(user)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)