import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import Loader from '../../Components/Loader';
import logo from '../../assets/images/logo-dark.png';
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { toast } from 'react-toastify';
import data from '../../country'
import axios from 'axios'
import { Form, Icon, Input, Button, Upload, notification, Select, DatePicker, message } from 'antd';

const { Option } = Select
const { Dragger } = Upload

const title = "Error"

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

class Submission extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            city: [],
            loading: false,
            disable: false
        }
    }

    normFile = e => {
        // this.setState({ disableUpload: false })
        // if (e.file.type.indexOf('image')) {
        //     this.openNotification(title, 'Please Upload an Image', 'close-circle', 'red')
        //     return
        // }
        // if (Array.isArray(e)) {
        //     return e;
        // }
        // if (e.fileList.length) {
        //     this.setState({ disableUpload: true })
        // }
        return e && e.fileList;
    }

    handleSubmit = e => {
        const { city } = this.state
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                // if (!validator.isAlpha(values.clientName)) {
                //     return toast.error("Client Name Must be an alphabet!!!");
                // }
                // else if (!validator.isAlphanumeric(values.title)) {
                //     return toast.error("Title Must be an alphaNumeric!!!");
                // }
                // values.city = city[values.city]
                // this.setState({ loading: true, disable: true })
                var formData = new FormData();
                formData.append('upload', values.upload[0].originFileObj)
                axios.post('https://wsr-server.herokuapp.com/login/signup', formData)
                    .then((result) => {
                        if (result.data.success) {
                            this.props.loginUser(result.data.user)
                            this.props.history.push('/dashboard')
                        }
                        else {
                            this.setState({ loading: false, disable: false })
                            this.openNotification(title, result.data.message, 'close-circle', 'red')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        });
    };


    render() {
        const { city } = this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Header {...this.props} />
                <div style={{ backgroundColor: '#E5E5E5' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'ceenter' }}>
                        <div className="card1">
                            <div>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <h1 className="heading1" >Closing Submission Form</h1>
                                    {/* <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(50% - 3px)', marginRight: 6 }}
                                    >
                                        {getFieldDecorator('agentId', {
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
                                            rules: [{ required: true, message: 'Please Select Your Country!' }],
                                        })(
                                            <Select
                                                showSearch
                                                style={{ backgroundColor: '#fff' }}
                                                placeholder="Select a Country"
                                                optionFilterProp="children"
                                                onSelect={(e) => this.setState({ city: data[e] })}
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {
                                                    Object.keys(data).map((v, i) => {
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
                                            rules: [{ required: true, message: 'Please input your Last Name!' }],
                                        })(
                                            <DatePicker style={{ width: '100%' }} />,
                                        )}
                                    </Form.Item>
                                     */}
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
                                        <Button htmlType="submit" disabled={this.state.disable} loading={this.state.loading} style={{ backgroundColor: '#120894', color: 'white', fontWeight: 'bold', fontSize: 14, height: 40, display: 'flex', width: '100%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                                            Sign Up
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const SubmissionForm = Form.create({ name: 'normal_login' })(Submission);

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



export default connect(mapStateToProps, mapDispatchToProps)(SubmissionForm)