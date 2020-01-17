import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import Loader from '../../Components/Loader';
import logo from '../../assets/images/logo-dark.png';
// import { Redirect, Link } from 'react-router-dom'


class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            <div class="authentication-bg">

                <div class="account-pages mt-5 mb-5">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-8 col-lg-6 col-xl-5">
                                <div class="card bg-pattern">

                                    <div class="card-body p-4">

                                        <div class="text-center w-75 m-auto">
                                            <a href="index.html">
                                                <span><img src={logo} alt="" height="22" /></span>
                                            </a>
                                            <p class="text-muted mb-4 mt-3">Enter your email address and password to access admin panel.</p>
                                        </div>

                                        <form action="#">

                                            <div class="form-group mb-3">
                                                <label for="emailaddress">Email address</label>
                                                <input class="form-control" type="email" id="emailaddress" required placeholder="Enter your email" />
                                            </div>

                                            <div class="form-group mb-3">
                                                <label for="password">Password</label>
                                                <input class="form-control" type="password" required id="password" placeholder="Enter your password" />
                                            </div>

                                            <div class="form-group mb-3">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" id="checkbox-signin" checked />
                                                    <label class="custom-control-label" for="checkbox-signin">Remember me</label>
                                                </div>
                                            </div>

                                            <div class="form-group mb-0 text-center">
                                                <button class="btn btn-primary btn-block" type="submit"> Log In </button>
                                            </div>

                                        </form>

                                        <div class="text-center">
                                            <h5 class="mt-3 text-muted">Sign in with</h5>
                                            <ul class="social-list list-inline mt-3 mb-0">
                                                <li class="list-inline-item">
                                                    <a href="javascript: void(0);" class="social-list-item border-primary text-primary"><i class="mdi mdi-facebook"></i></a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a href="javascript: void(0);" class="social-list-item border-danger text-danger"><i class="mdi mdi-google"></i></a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a href="javascript: void(0);" class="social-list-item border-info text-info"><i class="mdi mdi-twitter"></i></a>
                                                </li>
                                                <li class="list-inline-item">
                                                    <a href="javascript: void(0);" class="social-list-item border-secondary text-secondary"><i class="mdi mdi-github-circle"></i></a>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-12 text-center">
                                        <p> <a href="pages-recoverpw.html" class="text-white-50 ml-1">Forgot your password?</a></p>
                                        <p class="text-white-50">Don't have an account? <a href="pages-register.html" class="text-white ml-1"><b>Sign Up</b></a></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                {/* <footer class="footer footer-alt">
                    2015 - 2019 &copy; UBold theme by <a href="" class="text-white-50">Coderthemes</a>
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



export default connect(mapStateToProps, mapDispatchToProps)(Search)