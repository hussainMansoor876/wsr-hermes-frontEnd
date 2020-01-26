import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import Loader from '../../Components/Loader';
import logo from '../../assets/images/logo-dark.png';
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Upload, notification } from 'antd';


class Submission extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
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
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="Agent Id"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(50% - 10px)' }}
                                    >
                                        {getFieldDecorator('lname', {
                                            rules: [{ required: true, message: 'Please input your Last Name!' }],
                                        })(
                                            <Input
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="Last Name"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item className="sign-up">
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                style={{ backgroundColor: '#FCFCFC' }}
                                                placeholder="Username"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item className="sign-up">
                                        {getFieldDecorator('email', {
                                            rules: [{ required: true, message: 'Please input your Email!' }],
                                        })(
                                            <Input
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                type="email"
                                                placeholder="Email"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item className="sign-up">
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                            <Input
                                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                type="password"
                                                placeholder="Password"
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
                                        <Button htmlType="submit" className="login-form-button" disabled={this.state.disable} style={{ backgroundColor: '#37A000', color: 'white', fontWeight: 'bold', fontSize: 14, height: 40 }}>
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