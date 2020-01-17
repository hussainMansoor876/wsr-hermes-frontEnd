import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import Loader from '../../Components/Loader';
import logo from '../../assets/images/logo-dark.png';


class Signup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
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

                                        <form action="#">

                                            <div className="form-group">
                                                <label for="fullname">Full Name</label>
                                                <input className="form-control" type="text" id="fullname" placeholder="Enter your name" required />
                                            </div>
                                            <div className="form-group">
                                                <label for="emailaddress">Email address</label>
                                                <input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email" />
                                            </div>
                                            <div className="form-group">
                                                <label for="password">Password</label>
                                                <input className="form-control" type="password" required id="password" placeholder="Enter your password" />
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="checkbox-signup" />
                                                    <label className="custom-control-label" for="checkbox-signup">I accept <a href="javascript: void(0);" className="text-dark">Terms and Conditions</a></label>
                                                </div>
                                            </div>
                                            <div className="form-group mb-0 text-center">
                                                <button className="btn btn-success btn-block" type="submit"> Sign Up </button>
                                            </div>

                                        </form>

                                        <div className="text-center">
                                            <h5 className="mt-3 text-muted">Sign up using</h5>
                                            <ul className="social-list list-inline mt-3 mb-0">
                                                <li className="list-inline-item">
                                                    <a href="javascript: void(0);" className="social-list-item border-primary text-primary"><i className="mdi mdi-facebook"></i></a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="javascript: void(0);" className="social-list-item border-danger text-danger"><i className="mdi mdi-google"></i></a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="javascript: void(0);" className="social-list-item border-info text-info"><i className="mdi mdi-twitter"></i></a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="javascript: void(0);" className="social-list-item border-secondary text-secondary"><i className="mdi mdi-github-circle"></i></a>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>


                                <div className="row mt-3">
                                    <div className="col-12 text-center">
                                        <p className="text-white-50">Already have account?  <a href="pages-login.html" className="text-white ml-1"><b>Sign In</b></a></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* <footer className="footer footer-alt">
                    2015 - 2019 &copy; UBold theme by <a href="" className="text-white-50">Coderthemes</a>
                </footer> */}
            </div>
        )
    }
}



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



export default connect(mapStateToProps, mapDispatchToProps)(Signup)