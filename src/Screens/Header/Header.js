import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
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


    render() {
        return (
            <div style={{
                display: 'flex',
                paddingTop: 10,
                marginLeft: 20,
                marginRight: 20,
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex' }}>
                    <Link to="/">
                        <span><img src={logo} alt="" style={{ height: '45px', marginRight: 10 }} width="80" /></span>
                    </Link>

                    <h3 className="header-text">
                        Hermes
                </h3>
                    <div className="container1" onclick="myFunction(this)">
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <img src={'https://avatars0.githubusercontent.com/u/35415573?s=400&u=7585be6ddd43c201b02168c1fe36fd5e33a06bca&v=4'} alt="" style={{ marginRight: 10, borderRadius: 50 }} height="30" width="30" />
                    <div class="dropdown" style={{ marginTop: 10 }}>
                        <p class="dropdown-toggle" id="menu1" data-toggle="dropdown">Mansoor
    <span class="caret"></span></p>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">HTML</a></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">CSS</a></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">JavaScript</a></li>
                            <li role="presentation" class="divider"></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">About Us</a></li>
                        </ul>
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



export default connect(mapStateToProps, mapDispatchToProps)(Header)