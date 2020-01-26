import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import Loader from '../../Components/Loader';
import logo from '../../assets/images/logo-dark.png';
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import data from '../../country'
import { Form, Icon, Input, Button, Upload, notification, Select } from 'antd';

const { Option } = Select

class Submission extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            city: [],
        }
    }


    render() {
        const { city } = this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Header {...this.props} />
                <div style={{ backgroundColor: '#E5E5E5' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'ceenter' }}>
                        <div className="card">
                            <div>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <h1 style={{ textAlign: 'center' }} className="heading1" >Closing Submission Form</h1>
                                    <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginRight: 20 }}
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
                                        style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
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
                                        style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginRight: 20 }}
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
                                        style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
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
                                        style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginRight: 20 }}
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
                                        style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
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
                                        style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginRight: 20 }}
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
                                        style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
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
                                        {getFieldDecorator('upload', {
                                            valuePropName: 'fileList',
                                            getValueFromEvent: this.normFile,
                                        })(
                                            <Upload name="logo" accept="image/*" disabled={this.state.disable}>
                                                <Button disabled={this.state.disableUpload}>
                                                    <Icon type="upload" /> Click to upload
                                                </Button>
                                            </Upload>,
                                        )}
                                    </Form.Item>

                                    <Form.Item className="sign-up">
                                        <Button htmlType="submit" disabled={this.state.disable} style={{ backgroundColor: '#120894', color: 'white', fontWeight: 'bold', fontSize: 14, height: 40, display: 'flex', width: '100%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                                            Sign Up
                                        </Button>
                                        Or <Link to="/">Login Account</Link>
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