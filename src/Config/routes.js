import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";


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

