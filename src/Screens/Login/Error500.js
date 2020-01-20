import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Loader from '../../Components/Loader';
import logo from '../../assets/images/logo-dark.png';


class Error500 extends React.Component {

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

                                        <div className="text-center">
                                            <a href="index.html">
                                                <span><img src="../../assets/images/logo-dark.png" alt="" height="18" /></span>
                                            </a>
                                        </div>

                                        <div className="text-center mt-4">
                                            <h1 className="text-error">500</h1>
                                            <h3 className="mt-3 mb-2">Internal Server Error</h3>
                                            <p className="text-muted mb-3">Why not try refreshing your page? or you can contact <a to="mailto:wpowell@wsrealtor.com" target="_blank" className="text-dark"><b>Support</b></a></p>

                                            <a href="index.html" className="btn btn-success waves-effect waves-light">Back to Home</a>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
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



export default connect(mapStateToProps, mapDispatchToProps)(Error500)