import React from 'react';
import { removeUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import Loader from '../../Components/Loader';
import './Header.css'
import logo from '../../assets/images/logo-dark.png';
import ClosingSubmission from '../../assets/images/bagitems1.png'
import Dashboard from '../../assets/images/dash.png'


class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        const { user, location } = this.props
        if (!user) {
            this.props.history.replace('/')
        }

        if (user && user.role === 'agent' && location.pathname === '/review') {
            this.props.history.replace('/submission')
        }
        if (user && user.role === 'agent' && location.pathname === '/dashboard') {
            this.props.history.replace('/submission')
        }
    }

    logout() {
        this.props.history.push('/', { reload: true })
    }

    openNav() {
        // this.sideBar.style.height = "100%"

        // setTimeout(() => {
        //     this.sideBar.style.height = "100%"
        // }, 500)
        if (window.innerWidth > 500) {
            this.sideBar.style.width = "270px"
        }
        else {
            this.sideBar.style.width = "300px"
        }
    }

    closeNav() {
        this.sideBar.style.width = "0"
        // this.sideBar.style.height = "0"
        // if (window.innerWidth > 500) {
        //     document.getElementById("root").style.marginLeft = "0";
        // }
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
                    <div className="navbar1">
                        <span className="navbar2" onClick={() => this.openNav()}>&#9776; </span>
                    </div>
                    <div ref={e => this.sideBar = e} className="sidenav">
                        <a href="javascript:void(0)" className="closebtn" onClick={() => this.closeNav()}>&times;</a>
                        {user && user.role === 'admin' ? <div>
                            <Link className="sideLink" to="/dashboard" onClick={() => this.closeNav()}>
                                <img src={Dashboard} alt="Submission Form" className="side-icon" />
                                Dashboard
                            </Link>
                            <Link className="sideLink" to="/submission" onClick={() => this.closeNav()}>
                                <img src={ClosingSubmission} alt="Submission Form" className="side-icon" />
                                Submission Form
                                </Link>
                            <Link className="sideLink" to="/review" onClick={() => this.closeNav()}>
                                <img src={ClosingSubmission} alt="Submission Form" className="side-icon" />
                                Closing Review
                                </Link>
                        </div>
                            :
                            <div>
                                <Link className="sideLink" to="/submission" onClick={() => this.closeNav()}>
                                    <img src={ClosingSubmission} alt="Submission Form" className="side-icon" />
                                    Submission Form
                                </Link>
                                <Link className="sideLink" to="/subreview" onClick={() => this.closeNav()}>
                                    <img src={ClosingSubmission} alt="Submission Form" className="side-icon" />
                                    Closing Review
                                    </Link>
                            </div>}
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: 8 }}>
                    {/* <img src={'https://avatars0.githubusercontent.com/u/35415573?s=400&u=7585be6ddd43c201b02168c1fe36fd5e33a06bca&v=4'} alt="" style={{ marginRight: 10, borderRadius: 50 }} height="30" width="30" /> */}
                    {user && <div className="dropdown">
                        <span className="header2">
                            {user.fname} &nbsp;
                            <i className="fa fa-caret-down"></i>
                        </span>
                        <div className="dropdown-content">
                            <p className="text1" onClick={() => this.logout()}>Logout</p>
                        </div>
                    </div>}
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
        removeUser: () => dispatch(removeUser()),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Header)