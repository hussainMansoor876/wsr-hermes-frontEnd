import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Loader from '../../Components/Loader';
import './Header.css'
import logo from '../../assets/images/logo-dark.png';


class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            <div style={{
                display: 'flex',
                paddingTop: 10,
                marginLeft: 10,
                marginRight: 10
            }}>
                <Link to="/">
                    <span><img src={logo} alt="" style={{ height: '45px', marginRight: 10 }} width="80" /></span>
                </Link>

                <h3 className="header-text">
                    Hermes
                </h3>
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



export default connect(mapStateToProps, mapDispatchToProps)(Header)