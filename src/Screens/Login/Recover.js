import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import Loader from '../../Components/Loader';
import logo from '../../assets/images/logo-dark.png';
import { Link } from 'react-router-dom'


class Recover extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        const { user, history } = this.props;
        if (user) {
            history.replace('/dashboard')
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
                                                <span><img src={logo} alt="" height="100" width="200" /></span>
                                            </a>
                                            <p className="text-muted mb-4 mt-3">Enter your email address and we'll send you an email with instructions to reset your password.</p>
                                        </div>

                                        <form action="#">

                                            <div className="form-group mb-3">
                                                <label htmlFor="emailaddress">Email address</label>
                                                <input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email" />
                                            </div>

                                            <div className="form-group mb-0 text-center">
                                                <button className="btn btn-primary btn-block" type="submit"> Reset Password </button>
                                            </div>

                                        </form>

                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-12 text-center">
                                        <p className="text-white-50">Back to <a href="pages-login.html" className="text-white ml-1"><Link to="/" style={{ color: '#fff' }}>Log in</Link></a></p>
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
    
    return {
        user: state.authReducer.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (user) => dispatch(loginUser(user)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Recover)