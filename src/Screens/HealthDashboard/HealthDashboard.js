import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import Loader from '../../Components/Loader';
import { DatePicker } from 'antd';
import Header from '../Header/Header'
import moment from 'moment';
import Chart from 'react-apexcharts'

const { RangePicker } = DatePicker;

var series = [25, 15, 44, 55, 41, 17]
var options = {
    chart: {
        width: '100%',
        type: 'pie',
    },
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    // theme: {
    //     monochrome: {
    //         enabled: true
    //     }
    // },
    title: {
        text: "Number of leads"
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
}



class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            options: {
                chart: {
                    id: 'apexchart-example'
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            series: [{
                name: 'series-1',
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }]
        }
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
                <div className="chart1">
                    <Chart options={options} series={series} type="pie" width={500} height={320} />
                    <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
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