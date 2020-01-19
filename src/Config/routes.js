import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { Login, Signup, Confirm, Recover, Error404, Error500, Logout } from '../Screens'


function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => isLoggedIn === true ? (
                <Component {...props} />
            ) : (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
            }
        />
    );
}


class Routes extends Component {

    state = {
        user: null,
    }

    UNSAFE_componentWillMount() {
        const { user } = this.props
        if (user) {
            this.setState({ user: user })
        }
    }


    render() {
        const { user } = this.props;


        return (
            <Router>

                {/* {user && <React.Fragment>
                    <Header user={this.state.user} />
                    <Navbar />
                </React.Fragment>} */}



                <Switch>
                    {/* <Route path="/" exact component={Home} /> */}
                    <Route path="/" exact component={Login} />
                    <Route path="/register" exact component={Signup} />
                    <Route path="/confirm" exact component={Confirm} />
                    <Route path="/recover" exact component={Recover} />
                    <Route path="/404" exact component={Error404} />
                    <Route path="/500" exact component={Error500} />
                    <Route path="/logout" exact component={Logout} />

                </Switch>
            </Router>
        )
    }
}


const mapStateToProps = (state) => {
    console.log("mapToState", state.authReducer)
    return {
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps, null)(Routes)

