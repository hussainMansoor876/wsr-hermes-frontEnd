import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';


class AgentSummary extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        const { topData } = this.props
        return (
            <div style={{ textAlign: 'center', display: 'block', margin: 10 }}>
                <div className="boxes1">
                    <p className="headingText">Net Revenue</p>
                    <p className="text">${topData.netRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    <div style={{ display: 'flex' }}>
                        <p className="textBottom">15.10%</p>
                        <p className="textBottom1">&nbsp;(31 days)</p>
                    </div>
                </div>
                <div className="boxes1">
                    <p className="headingText">Revenue per Deal</p>
                    <p className="text">${Math.round(topData.revPerDeal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    <div style={{ display: 'flex' }}>
                        <p className="textBottom">15.10%</p>
                        <p className="textBottom1">&nbsp;(31 days)</p>
                    </div>
                </div>
                <div className="boxes1">
                    <p className="headingText">Sale Price per Deal</p>
                    <p className="text">${Math.round(topData.salesPerDeal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    <div style={{ display: 'flex' }}>
                        <p className="textBottom">15.10%</p>
                        <p className="textBottom1">&nbsp;(31 days)</p>
                    </div>
                </div>
                <div className="boxes1">
                    <p className="headingText">Deals</p>
                    <p className="text">{topData.deals}</p>
                    <div style={{ display: 'flex' }}>
                        <p className="textBottom">15.10%</p>
                        <p className="textBottom1">&nbsp;(31 days)</p>
                    </div>
                </div>
                <div className="boxes1">
                    <p className="headingText">Agents Capped</p>
                    <p className="text">{topData.activeAgent}</p>
                    <div style={{ display: 'flex' }}>
                        <p className="textBottom">15.10%</p>
                        <p className="textBottom1">&nbsp;(31 days)</p>
                    </div>
                </div>
                <div className="boxes1">
                    <p className="headingText">Active Agents</p>
                    <p className="text">{topData.activeAgent}</p>
                    <div style={{ display: 'flex' }}>
                        <p className="textBottom">15.10%</p>
                        <p className="textBottom1">&nbsp;(31 days)</p>
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



export default connect(mapStateToProps, mapDispatchToProps)(AgentSummary)