import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import Loader from '../../Components/Loader';
import { DatePicker } from 'antd';
import Header from '../Header/Header'
import moment from 'moment';
import PieChart from 'react-minimal-pie-chart';

const { RangePicker } = DatePicker;


class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment('31/12/2019').endOf('day');
    }


    render() {
        return (
            <div>
                <Header {...this.props} />
                <div style={{ backgroundColor: '#E5E5E5' }}>
                    <div className="dashboardHeader" style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                        Woodward Square Reality Health Report
                        <PieChart
                            data={[
                                { title: 'One', value: 10, color: '#4472C4' },
                                { title: 'Two', value: 15, color: '#5B9BD5' },
                                { title: 'Three', value: 20, color: '#FFC000' },
                                { title: 'Three', value: 20, color: '#ED7D31' },
                            ]}
                        />
                    </div>
                    <div style={{ display: 'flex', margin: 20, flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }} className="dateRange">
                        <RangePicker
                            disabledDate={this.disabledDate.bind(this)}
                            format="YYYY-MM-DD"
                        />
                    </div>
                    <div style={{ textAlign: 'center', display: 'block', margin: 10 }}>
                        <div class="boxes1">
                            <p className="headingText">Net Revenue</p>
                            <p className="text">$15.23</p>
                            <div style={{ display: 'flex' }}>
                                <p className="textBottom">15.10%</p>
                                <p className="textBottom1">&nbsp;(31 days)</p>
                            </div>
                        </div>
                        <div class="boxes1">
                            <p className="headingText">Net Revenue</p>
                            <p className="text">$15.23</p>
                            <div style={{ display: 'flex' }}>
                                <p className="textBottom">15.10%</p>
                                <p className="textBottom1">&nbsp;(31 days)</p>
                            </div>
                        </div>
                        <div class="boxes1">
                            <p className="headingText">Net Revenue</p>
                            <p className="text">$15.23</p>
                            <div style={{ display: 'flex' }}>
                                <p className="textBottom">15.10%</p>
                                <p className="textBottom1">&nbsp;(31 days)</p>
                            </div>
                        </div>
                        <div class="boxes1">
                            <p className="headingText">Net Revenue</p>
                            <p className="text">$15.23</p>
                            <div style={{ display: 'flex' }}>
                                <p className="textBottom">15.10%</p>
                                <p className="textBottom1">&nbsp;(31 days)</p>
                            </div>
                        </div>
                        <div class="boxes1">
                            <p className="headingText">Net Revenue</p>
                            <p className="text">$15.23</p>
                            <div style={{ display: 'flex' }}>
                                <p className="textBottom">15.10%</p>
                                <p className="textBottom1">&nbsp;(31 days)</p>
                            </div>
                        </div>
                        <div class="boxes1">
                            <p className="headingText">Net Revenue</p>
                            <p className="text">$15.23</p>
                            <div style={{ display: 'flex' }}>
                                <p className="textBottom">15.10%</p>
                                <p className="textBottom1">&nbsp;(31 days)</p>
                            </div>
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
        loginUser: (user) => dispatch(loginUser(user)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)