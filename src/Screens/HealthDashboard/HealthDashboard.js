import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import Loader from '../../Components/Loader';
import { DatePicker, Select, Skeleton } from 'antd';
import Header from '../Header/Header'
import moment from 'moment';
import Chart from 'react-apexcharts'
import axios from 'axios'

const { RangePicker } = DatePicker;
const { Option } = Select;

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
            }],
            series1: [{
                name: 'Website Blog',
                type: 'column',
                data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
            }, {
                name: 'Social Media',
                type: 'line',
                data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
            }],
            options1: {
                chart: {
                    height: 350,
                    type: 'line',
                },
                stroke: {
                    width: [0, 4]
                },
                title: {
                    text: 'Traffic Sources'
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                },
                labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
                xaxis: {
                    type: 'datetime'
                },
                yaxis: [{
                    title: {
                        text: 'Website Blog',
                    },

                }, {
                    opposite: true,
                    title: {
                        text: 'Social Media'
                    }
                }]
            },
            series2: [{
                data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
            }],
            options2: {
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                        'United States', 'China', 'Germany'
                    ],
                }
            },
            allData: [],
            currentAgent: []
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
        return current && current < moment('31/12/2019').endOf('day');
    }

    async componentWillMount() {
        await axios.get('http://127.0.0.1:3001/admin/getAll')
            .then((res) => {
                const { data } = res.data
                console.log('data', data)
                this.setState({ allData: data }, () => {
                    const { allData } = this.state
                    axios.get(`http://127.0.0.1:3001/subform/get-user/${allData[0]._id}`)
                    .then((response)=>{
                        this.setState({
                            currentAgent
                        })
                    })
                })
            })
            .catch((err) => console.log(err))
    }


    render() {
        const { allData } = this.state
        if (!allData.length) {
            return (
                <div>
                    <Header {...this.props} />
                    <div style={{ backgroundColor: '#E5E5E5' }}>
                        <Skeleton paragraph={{ rows: 20 }} />
                    </div>
                </div>
            )
        }
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
                    <div className="chartBody">
                        <div className="chartBody1">
                            <div className="chart3">
                                <div className="chart1 mLeft">
                                    <Chart options={options} series={series} type="pie" height={310} />
                                </div>
                                <div className="chart1 mLeft1">
                                    <Chart options={this.state.options} series={this.state.series} type="bar" height={300} />
                                </div>
                            </div>
                            <div className="chart4 mLeft">
                                <h1 className="heading2">Agent Summary</h1>
                                <div className="select1">
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        defaultValue={allData && allData[0].fname}
                                        // placeholder="Select a person"
                                        optionFilterProp="children"
                                        onChange={(e) => console.log(e)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {allData.map((v, i) => {
                                            return <Option value={v._id}>{v.fname}</Option>
                                        })}
                                        {/* <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option> */}
                                    </Select>
                                </div>
                                <div className="div2">
                                    <div className="div6">
                                        <div className="div3 deal1">
                                            <h1 className="divBody">Deals</h1>
                                            <h1 className="divBody">4</h1>
                                        </div>
                                        <div className="div3">
                                            <h1 className="divBody">Sales Volume</h1>
                                            <h1 className="divBody">$3,113,800</h1>
                                        </div>
                                        <div className="div3">
                                            <h1 className="divBody">WSR Revenue</h1>
                                            <h1 className="divBody">$4,500</h1>
                                        </div>
                                    </div>
                                    <div className="div6">
                                        <div className="div3">
                                            <h1 className="divBody">Commission</h1>
                                            <h1 className="divBody">$76,259</h1>
                                        </div>
                                        <div className="div3">
                                            <h1 className="divBody">Cap Fill</h1>
                                            <h1 className="divBody">100%</h1>
                                        </div>
                                        <div className="div3">
                                            <h1 className="divBody">Recruits</h1>
                                            <h1 className="divBody">4</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="div8">
                                    <div className="div7">
                                        <div className="div3">
                                            <h1 className="divBody">Deals</h1>
                                            <h1 className="divBody">4</h1>
                                        </div>
                                        <div className="div3">
                                            <h1 className="divBody">Sales Volume</h1>
                                            <h1 className="divBody">$3,113,800</h1>
                                        </div>
                                    </div>
                                    <div className="div7">
                                        <div className="div3">
                                            <h1 className="divBody">WSR Revenue</h1>
                                            <h1 className="divBody">$4,500</h1>
                                        </div>
                                        <div className="div3">
                                            <h1 className="divBody">Commission</h1>
                                            <h1 className="divBody">$76,259</h1>
                                        </div>
                                    </div>
                                    <div className="div7">
                                        <div className="div3">
                                            <h1 className="divBody">Cap Fill</h1>
                                            <h1 className="divBody">100%</h1>
                                        </div>
                                        <div className="div3">
                                            <h1 className="divBody">Recruits</h1>
                                            <h1 className="divBody">4</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chart2">
                            <Chart options={this.state.options1} series={this.state.series1} type="line" height={500} />
                        </div>
                    </div>
                    <div className="chartBody2">
                        <div className="div4">
                            <Chart options={this.state.options2} series={this.state.series2} type="bar" height={300} />
                        </div>
                        <div className="div5">
                            <Chart options={this.state.options} series={this.state.series} type="bar" height={300} />
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