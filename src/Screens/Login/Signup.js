import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, notification, Select, DatePicker } from 'antd';
import Loader from '../../Components/Loader';
import data from '../../country'
import logo from '../../assets/images/logo-dark.png';


const { Option } = Select


class Signup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            city: [],
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        const { city } = this.state
        return (
            <div className="authentication-bg authentication-bg-pattern">
                <div className="account-pages mt-5 mb-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-pattern">

                                    <div className="card-body p-4">

                                        <div className="text-center w-75 m-auto">
                                            <a href="index.html">
                                                <span><img src={logo} alt="" height="22" /></span>
                                            </a>
                                            <p className="text-muted mb-4 mt-3">Don't have an account? Create your account, it takes less than a minute</p>
                                        </div>
                                        <Form layout="horizontal" onSubmit={this.handleSubmit} className="login-form">
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(50% - 1px)', marginRight: 1 }}
                                            >
                                                {getFieldDecorator('fname', {
                                                    rules: [{ required: true, message: 'Please input your First Name!' }],
                                                })(
                                                    <Input
                                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                        placeholder="First Name"
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                style={{ display: 'inline-block', width: 'calc(50% - 1px)' }}
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
                                            <Form.Item
                                            >
                                                {getFieldDecorator('email', {
                                                    rules: [{ required: true, message: 'Please input your Last Name!' }],
                                                })(
                                                    <Input
                                                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                        placeholder="Email"
                                                    />,
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                {getFieldDecorator('phone', {
                                                    rules: [{ required: true, message: 'Please input your phone number!' }],
                                                })(<Input
                                                    prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Phone Number"
                                                />)}
                                            </Form.Item>
                                            <Form.Item 
                                            style={{ display: 'inline-block', width: 'calc(50% - 1px)', marginRight: 1 }}
                                            hasFeedback>
                                                {getFieldDecorator('password', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                        {
                                                            validator: this.validateToNextPassword,
                                                        },
                                                    ],
                                                })(<Input.Password
                                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Enter your Password" />)}
                                            </Form.Item>
                                            <Form.Item 
                                            style={{ display: 'inline-block', width: 'calc(50% - 1px)' }}
                                            hasFeedback>
                                                {getFieldDecorator('confirm', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please confirm your password!',
                                                        },
                                                        {
                                                            validator: this.compareToFirstPassword,
                                                        },
                                                    ],
                                                })(<Input.Password
                                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Confirm Password"
                                                    onBlur={this.handleConfirmBlur} />)}
                                            </Form.Item>
                                            <Form.Item>
                                                {getFieldDecorator('address', {
                                                    rules: [{ required: true, message: 'Please input your street address!' }],
                                                })(<Input
                                                    prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Street Address"
                                                />)}
                                            </Form.Item>
                                            <Form.Item
                                            style={{ display: 'inline-block', width: 'calc(50% - 1px)', marginRight: 1 }}
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
                                            style={{ display: 'inline-block', width: 'calc(50% - 1px)' }}
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
                                            style={{ display: 'inline-block', width: 'calc(50% - 1px)', marginRight: 1 }}
                                            >
                                                {getFieldDecorator('address', {
                                                    rules: [{ required: true, message: 'Please input your zip code!' }],
                                                })(<Input
                                                    prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Zip Code"
                                                />)}
                                            </Form.Item>
                                            <Form.Item
                                            style={{ display: 'inline-block', width: 'calc(50% - 1px)' }}>
                                                {getFieldDecorator('board', {
                                                    rules: [{ required: true, message: 'Please input your board!' }],
                                                })(<Input
                                                    prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Board"
                                                />)}
                                            </Form.Item>
                                            <Form.Item
                                            style={{ display: 'inline-block', width: 'calc(50% - 1px)', marginRight: 1 }}
                                            >
                                                {getFieldDecorator('license', {
                                                    rules: [{ required: true, message: 'Please input your license number!' }],
                                                })(<Input
                                                    prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="License Number"
                                                />)}
                                            </Form.Item>
                                            <Form.Item
                                            style={{ display: 'inline-block', width: 'calc(50% - 1px)' }}
                                            >
                                                {getFieldDecorator('recruited', {
                                                    rules: [{ required: true, message: 'Please input your Recruited!' }],
                                                })(<Input
                                                    prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Recruited By"
                                                />)}
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" className="login-form-button btn-block signup-btn">
                                                    Register
                                                </Button>
                                                Already have account? <Link to="" className="login-form-forgot" style={{ color: '#1abc9c' }}>Sign In</Link>
                                            </Form.Item>
                                        </Form>


                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const SignupComp = Form.create({ name: 'normal_login' })(Signup);



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



export default connect(mapStateToProps, mapDispatchToProps)(SignupComp)