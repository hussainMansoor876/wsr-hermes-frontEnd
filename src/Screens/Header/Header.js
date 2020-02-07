import React from 'react';
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
        console.log(location)
        console.log(user)

        if (!user) {
            this.props.history.replace('/')
        }

        if (user && user.role === 'agent' && location.pathname === '/dashboard') {
            this.props.history.replace('/submission')
        }
    }

    logout() {
        setTimeout(() => {
            this.props.history.push('/', { reload: true })
        }, 100)
    }

    openNav() {
        this.sideBar.style.width = "250px"
        this.sideBar.style.height = "100%"

        // setTimeout(() => {
        //     this.sideBar.style.height = "100%"
        // }, 500)
        if (window.innerWidth > 500) {
            document.getElementById("root").style.marginLeft = "250px";
        }
    }

    closeNav() {
        this.sideBar.style.width = "0"
        this.sideBar.style.height = "0"
        if (window.innerWidth > 500) {
            document.getElementById("root").style.marginLeft = "0";
        }
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
                    {/* <div className="container1" style={{ backgroundColor: 'white' }}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div> */}
                    <div className="navbar1">
                        <span className="navbar2" onClick={() => this.openNav()}>&#9776; </span>
                    </div>
                    <div ref={e => this.sideBar = e} class="sidenav">
                        <a href="javascript:void(0)" class="closebtn" onClick={() => this.closeNav()}>&times;</a>
                        {user.role === 'admin' ? <div>
                            <Link className="sideLink" to="/dashboard" onClick={()=> this.closeNav()}>Dashboard</Link>
                            <Link className="sideLink" to="/submission" onClick={()=> this.closeNav()}>Submission Form</Link>
                            <Link className="sideLink" to="/review" onClick={()=> this.closeNav()}>Closing Review</Link>
                        </div>
                            : <Link className="sideLink" to="/submission" onClick={()=> this.closeNav()}>Submission Form</Link>}
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: 8 }}>
                    <img src={'https://avatars0.githubusercontent.com/u/35415573?s=400&u=7585be6ddd43c201b02168c1fe36fd5e33a06bca&v=4'} alt="" style={{ marginRight: 10, borderRadius: 50 }} height="30" width="30" />
                    <div className="dropdown">
                        <span className="header2">
                            {user.fname} &nbsp;
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