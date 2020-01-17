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
            <React.Fragment>

                <div className="account-pages mt-5 mb-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5} >
                                <Card className="bg-pattern">
                                    <CardBody className="p-4 position-relative">
                                        { /* preloader */}
                                        {this.props.loading && <Loader />}

                                        <div className="text-center w-75 m-auto">
                                            <a href="/">
                                                <span><img src={logo} alt="" height="22" /></span>
                                            </a>
                                            <p className="text-muted mb-4 mt-3">Enter your username and password to access admin panel.</p>
                                        </div>


                                        {this.props.error && <Alert color="danger" isOpen={this.props.error ? true : false}>
                                            <div>{this.props.error}</div>
                                        </Alert>}

                                        <AvForm onValidSubmit={this.handleValidSubmit}>
                                            <AvField name="username" label="Username" placeholder="Enter your username" value={this.state.username} required />

                                            <AvGroup className="mb-3">
                                                <Label for="password">Password</Label>
                                                <AvInput type="password" name="password" id="password" placeholder="Enter your password" value={this.state.password} required />
                                                <AvFeedback>This field is invalid</AvFeedback>
                                            </AvGroup>

                                            <FormGroup>
                                                <Button color="primary" className="btn-block">Log In</Button>
                                            </FormGroup>

                                            <p><strong>Username:</strong> test &nbsp;&nbsp; <strong>Password:</strong> test</p>
                                        </AvForm>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col className="col-12 text-center">
                                {/* <p><Link to="/forget-password" className="text-white-50 ml-1">Forgot your password?</Link></p> */}
                                {/* <p className="text-white-50">Don't have an account? <Link to="/register" className="text-white ml-1"><b>Register</b></Link></p> */}
                            </Col>
                        </Row>

                    </Container>
                </div>

                <footer className="footer footer-alt">
                    {/* 2015 - 2019 &copy; UBold theme by <Link to="https://coderthemes.com" className="text-white-50">Coderthemes</Link> */}
                </footer>
            </React.Fragment>
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