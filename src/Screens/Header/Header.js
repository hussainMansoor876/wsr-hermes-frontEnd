import React, { Component } from 'react';
import { removeUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import Loader from '../../Components/Loader';
import './Header.css'
import logo from '../../assets/images/logo-dark.png';


class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        const { user, location } = this.props

        if (!user) {
            this.props.history.push('/')
        }
    }

    logout() {
        setTimeout(() => {
            this.props.history.push('/', { reload: true })
        }, 100)
    }


    render() {
        const { user } = this.props
        return (
            <div style={{
                display: 'flex',
                paddingTop: 10,
                marginLeft: 10,
                marginRight: 10,
                justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex' }}>
                    <Link to="/">
                        <span><img src={logo} alt="" style={{ height: '45px', marginRight: 10 }} width="80" /></span>
                    </Link>

                    <h3 className="header-text">
                        Hermes
                    </h3>
                    {/* <div className="container1" style={{ backgroundColor: 'white' }} onclick="myFunction(this)">
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div> */}
                </div>
                <div style={{ display: 'flex', marginTop: 8 }}>
                    <img src={'https://avatars0.githubusercontent.com/u/35415573?s=400&u=7585be6ddd43c201b02168c1fe36fd5e33a06bca&v=4'} alt="" style={{ marginRight: 10, borderRadius: 50 }} height="30" width="30" />
                    <div className="dropdown">
                        <span className="header2">
                            Mansoor &nbsp;
                            <i className="fa fa-caret-down"></i>
                        </span>
                        <div className="dropdown-content">
                            <p className="text1" onClick={() => this.logout()}>Logout</p>
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
        removeUser: () => dispatch(removeUser()),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Header)