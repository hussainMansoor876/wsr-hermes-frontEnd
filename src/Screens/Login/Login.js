import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import Loader from '../../Components/Loader';
import logo from '../../assets/images/logo-dark.png';


class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            <div className="authentication-bg">

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
                                            <p className="text-muted mb-4 mt-3">Enter your email address and password to access admin panel.</p>
                                        </div>

                                        <form action="#">

                                            <div className="form-group mb-3">
                                                <label for="emailaddress">Email address</label>
                                                <input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email" />
                                            </div>

                                            <div className="form-group mb-3">
                                                <label for="password">Password</label>
                                                <input className="form-control" type="password" required id="password" placeholder="Enter your password" />
                                            </div>

                                            <div className="form-group mb-3">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="checkbox-signin" checked />
                                                    <label className="custom-control-label" for="checkbox-signin">Remember me</label>
                                                </div>
                                            </div>

                                            <div className="form-group mb-0 text-center">
                                                <button className="btn btn-primary btn-block" type="submit"> Log In </button>
                                            </div>

                                        </form>

                                        <div className="text-center">
                                            <h5 className="mt-3 text-muted">Sign in with</h5>
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
                                        <p> <a href="pages-recoverpw.html" className="text-white-50 ml-1">Forgot your password?</a></p>
                                        <p className="text-white-50">Don't have an account? <a href="pages-register.html" className="text-white ml-1"><b>Sign Up</b></a></p>
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



export default connect(mapStateToProps, mapDispatchToProps)(Login)