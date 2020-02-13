import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import Loader from '../../Components/Loader';
import { DatePicker, Select, Skeleton, Button } from 'antd';
import Header from '../Header/Header'
import moment from 'moment';
import Chart from 'react-apexcharts'
import axios from 'axios'

const { Option } = Select;
const ButtonGroup = Button.Group;



class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            saleTypeChart: {
                series: [0, 0, 0, 0, 0],
                options: {
                    chart: {
                        width: '100%',
                        type: 'pie',
                    },
                    labels: ["Buy", "Sell", "Rental", "Whole", "Referral"],
                    title: {
                        text: "Revenue By Sale Types"
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 310
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                }
            },
            salePriceHist: {
                options: {
                    chart: {
                        id: 'apexchart-example',
                    },
                    xaxis: {
                        categories: [0, 0, 0, 0, 0]
                    },
                    title: {
                        text: 'Closing By Sale Price'
                    }
                },
                series: [{
                    name: 'series-1',
                    data: [30, 40, 45, 50, 49]
                }]
            },
            options: {
                chart: {
                    id: 'apexchart-example',
                },
                xaxis: {
                    categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                },
                title: {
                    text: 'Sales Amount Over Time'
                }
            },
            series: [{
                name: 'series-1',
                data: [30, 40, 45, 50, 49, 60, 70, 91, 88, 77, 55, 44]
            }],
            series1: [{
                name: 'Website Blog',
                type: 'column',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }, {
                name: 'Social Media',
                type: 'line',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }],
            lineChart: {
                series: [{
                    name: 'Website Blog',
                    type: 'column',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }, {
                    name: 'Social Media',
                    type: 'line',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }],
                options: {
                    chart: {
                        height: 350,
                        type: 'line',
                    },
                    stroke: {
                        width: [0, 4]
                    },
                    title: {
                        text: 'Deals & Revenue Over Time'
                    },
                    dataLabels: {
                        enabled: true,
                        enabledOnSeries: [1]
                    },
                    xaxis: {
                        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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
                }
            },
            options1: {
                chart: {
                    height: 350,
                    type: 'line',
                },
                stroke: {
                    width: [0, 4]
                },
                title: {
                    text: 'Deals & Revenue Over Time'
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                },
                xaxis: {
                    categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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
                title: {
                    text: 'Agent Performance'
                },
                xaxis: {
                    categories: ['Agent 1', 'Agent 2', 'Agent 3', 'Agent 4', 'Agent 5', 'Agent 6', 'Agent 7',
                        'Agent 8', 'Agent 9', 'Agent 10'
                    ],
                }
            },
            allData: [],
            currentAgent: [],
            stats: {
                deal: 0,
                sales: 0,
                revenue: 0,
                commission: 0,
                cap: 0,
                recruits: 0
            },
            startDate: moment('2020-01-01', 'YYYY-MM-DD'),
            endDate: moment(),
            StartDateValue: moment('2020-01-01', 'YYYY-MM-DD'),
            loading: false,
            topData: {
                netRevenue: 0,
                revPerDeal: 0,
                salesPerDeal: 0,
                deals: 0,
                AgentCapped: 0,
                activeAgent: 0,
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

    distribute(max, buckets) {
        var arr = [], rpt = max / buckets, groupLiteral_low;
        for (var i = 0; i < max; i += rpt) {
            if (Math.ceil(i) !== i || i === 0) {
                groupLiteral_low = Math.ceil(i);
            } else {
                groupLiteral_low = Math.ceil(i) + 1;
            }
            arr.push({
                limit: (Math.floor(rpt + i)),
                literal: `[$${groupLiteral_low}, $${Math.floor(rpt + i)}]`,
                min: groupLiteral_low,
                max: Math.floor(rpt + i)
            });
        }
        return arr;
    }

    disabledDate(current) {
        return current < this.state.startDate
    }

    disabledEndDate(current) {
        return current < this.state.StartDateValue
    }

    async componentWillMount() {
        const { startDate, endDate } = this.state
        var topData = { ...this.state.topData }
        var histData = { ...this.state.salePriceHist }
        var lineData = { ...this.state.lineChart }
        var month = { 0: 0, 1: 2, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0 }
        var obj = { "Buy": 0, "Sell": 0, "Rental": 0, "Whole": 0, "Referral": 0 }
        var arr = []
        axios.post('https://wsr-server.herokuapp.com/admin/getAll', {
            startDate: startDate.toArray(),
            endDate: endDate.toArray()
        })
            .then((res) => {
                var { data } = res
                if (data.success) {
                    console.log('res', month[moment(data.data[0].timestamp).month()])
                    if (data.data.length) {
                        var len = data.data.length
                        var maxVal = Math.max.apply(Math, data.data.map(v => v.soldPrice))
                        var record = this.distribute(maxVal, 5)
                        var arr1 = record.map(v => v.literal)
                        histData.options.xaxis.categories = arr1
                        var saleObj = {}
                        for (var ind of arr1) {
                            saleObj[ind] = 0
                        }
                        maxVal = maxVal / 5
                        for (var i of data.data) {
                            month[moment(i.timestamp).month()] += i.paidAmount
                            topData.netRevenue += i.paidAmount
                            topData.salesPerDeal += i.soldPrice
                            obj[i.saleType] += i.paidAmount
                            if (i.soldPrice <= maxVal) {
                                saleObj[arr1[0]] += 1
                            }
                            else if (i.soldPrice <= maxVal * 2) {
                                saleObj[arr1[1]] += 1
                            }
                            else if (i.soldPrice <= maxVal * 3) {
                                saleObj[arr1[2]] += 1
                            }
                            else if (i.soldPrice <= maxVal * 4) {
                                saleObj[arr1[3]] += 1
                            }
                            else {
                                saleObj[arr1[4]] += 1
                            }
                        }
                        topData.revPerDeal = topData.netRevenue / len
                        topData.salesPerDeal = topData.salesPerDeal / len
                        topData.deals = len
                        lineData.series[0].data = 

                        histData.series[0].data = Object.entries(saleObj).map(v => v[1])

                    }
                    for (var j in obj) {
                        arr.push(obj[j])
                    }
                    this.setState({
                        loading: true, topData: topData, saleTypeChart: {
                            ...this.state.saleTypeChart, series: arr
                        }, salePriceHist: histData
                    })
                }

            })
        await axios.get('https://wsr-server.herokuapp.com/admin/getusers')
            .then((res) => {
                var { data } = res.data
                topData.activeAgent = data.length
                this.setState({ allData: data, topData: topData }, () => {
                    var { allData, stats } = this.state
                    axios.post(`https://wsr-server.herokuapp.com/admin/get-user/${allData[0]._id}`, {
                        startDate: startDate.toArray(),
                        endDate: endDate.toArray()
                    })
                        .then((response) => {
                            var { data } = response
                            stats.deal = data.data.length
                            for (var i of data.data) {
                                stats.revenue += i.paidAmount
                                stats.sales += i.soldPrice
                            }
                            console.log(stats)
                            this.setState({
                                currentAgent: response.data.data,
                                stats: stats,
                            })
                        })
                })
            })
            .catch((err) => console.log(err))
    }

    async getUpdate(id) {
        const { StartDateValue, endDate } = this.state
        var stats1 = {
            deal: 0,
            sales: 0,
            revenue: 0,
            commission: 0,
            cap: 0,
            recruits: 0
        }
        await axios.post(`https://wsr-server.herokuapp.com/admin/get-user/${id}`, {
            startDate: StartDateValue.toArray(),
            endDate: endDate.toArray()
        })
            .then((response) => {
                var { data } = response
                stats1.deal = data.data.length
                for (var i of data.data) {
                    console.log(i)
                    stats1.revenue += i.paidAmount
                    stats1.sales += i.soldPrice
                }
                this.setState({
                    stats: stats1
                })
            })
    }

    updateChart() {
        const { StartDateValue, endDate } = this.state
        var topData = { ...this.state.topData }
        var histData = { ...this.state.salePriceHist }
        var obj = { "Buy": 0, "Sell": 0, "Rental": 0, "Whole": 0, "Referral": 0 }
        var arr = []
        axios.post('https://wsr-server.herokuapp.com/admin/getAll', {
            startDate: StartDateValue.toArray(),
            endDate: endDate.toArray()
        })
            .then((res) => {
                var { data } = res
                if (data.success) {
                    var len = data.data.length
                    if (data.data.length) {
                        var maxVal = Math.max.apply(Math, data.data.map(v => v.soldPrice))
                        var record = this.distribute(maxVal, 5)
                        var arr1 = record.map(v => v.literal)
                        histData.options.xaxis.categories = arr1
                        var saleObj = {}
                        for (var ind of arr1) {
                            saleObj[ind] = 0
                        }
                        maxVal = maxVal / 5
                        for (var i of data.data) {
                            console.log(i)
                            topData.netRevenue += i.paidAmount
                            topData.salesPerDeal += i.soldPrice
                            obj[i.saleType] += i.paidAmount
                            if (i.soldPrice <= maxVal) {
                                saleObj[arr1[0]] += 1
                            }
                            else if (i.soldPrice <= maxVal * 2) {
                                saleObj[arr1[1]] += 1
                            }
                            else if (i.soldPrice <= maxVal * 3) {
                                saleObj[arr1[2]] += 1
                            }
                            else if (i.soldPrice <= maxVal * 4) {
                                saleObj[arr1[3]] += 1
                            }
                            else {
                                saleObj[arr1[4]] += 1
                            }
                        }
                        topData.revPerDeal = topData.netRevenue / len
                        topData.salesPerDeal = topData.salesPerDeal / len
                        topData.deals = len

                        histData.series[0].data = Object.entries(saleObj).map(v => v[1])

                    }
                    for (var j in obj) {
                        arr.push(obj[j])
                    }
                    this.setState({
                        loading: true, topData: topData, saleTypeChart: {
                            ...this.state.saleTypeChart, series: arr
                        }, salePriceHist: histData
                    })
                }

            })
    }


    render() {
        const { allData, currentAgent, stats, startDate, loading, topData, saleTypeChart, salePriceHist, lineChart } = this.state
        if (!allData.length & !currentAgent.length || !loading) {
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
                        <DatePicker defaultValue={startDate} disabledDate={this.disabledDate.bind(this)} showToday={false} onChange={(e) => this.setState({ StartDateValue: e }, () => {
                            this.updateChart()
                        })} />
                        <DatePicker defaultValue={moment()} onChange={(e) => this.setState({ endDate: e }, () => {
                            this.updateChart()
                        })} disabledDate={this.disabledEndDate.bind(this)} />
                    </div>
                    <div style={{ textAlign: 'center', display: 'block', margin: 10 }}>
                        <div className="boxes1">
                            <p className="headingText">Net Revenue</p>
                            <p className="text">${topData.netRevenue}</p>
                            <div style={{ display: 'flex' }}>
                                <p className="textBottom">15.10%</p>
                                <p className="textBottom1">&nbsp;(31 days)</p>
                            </div>
                        </div>
                        <div className="boxes1">
                            <p className="headingText">Revenue per Deal</p>
                            <p className="text">${Math.round(topData.revPerDeal)}</p>
                            <div style={{ display: 'flex' }}>
                                <p className="textBottom">15.10%</p>
                                <p className="textBottom1">&nbsp;(31 days)</p>
                            </div>
                        </div>
                        <div className="boxes1">
                            <p className="headingText">Sale Price per Deal</p>
                            <p className="text">${Math.round(topData.salesPerDeal)}</p>
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
                    <div className="chartBody">
                        <div className="chartBody1">
                            <div className="chart3">
                                <div className="chart1 mLeft">
                                    <Chart options={saleTypeChart.options} series={saleTypeChart.series} type="pie" height={310} />
                                </div>
                                <div className="chart1 mLeft1">
                                    <Chart options={salePriceHist.options} series={salePriceHist.series} type="histogram" height={300} />
                                </div>
                            </div>
                            <div className="chart4 mLeft">
                                <h1 className="heading2">Agent Summary</h1>
                                <div className="select1">
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        defaultValue={allData && allData[0].fname}
                                        optionFilterProp="children"
                                        onChange={(e) => this.getUpdate(e)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {allData.map((v, i) => {
                                            return <Option value={v._id} key={i}>{v.fname}</Option>
                                        })}
                                    </Select>
                                </div>
                                <div className="div2">
                                    <div className="div6">
                                        <div className="div3 deal1">
                                            <h1 className="divBody">Deals</h1>
                                            <h1 className="divBody">{stats.deal}</h1>
                                        </div>
                                        <div className="div3">
                                            <h1 className="divBody">Sales Volume</h1>
                                            <h1 className="divBody">${stats.sales}</h1>
                                        </div>
                                        <div className="div3">
                                            <h1 className="divBody">WSR Revenue</h1>
                                            <h1 className="divBody">${stats.revenue}</h1>
                                        </div>
                                    </div>
                                    <div className="div6">
                                        <div className="div3">
                                            <h1 className="divBody">Commission</h1>
                                            <h1 className="divBody">${stats.commission}</h1>
                                        </div>
                                        <div className="div3">
                                            <h1 className="divBody">Cap Fill</h1>
                                            <h1 className="divBody">{stats.cap}%</h1>
                                        </div>
                                        <div className="div3">
                                            <h1 className="divBody">Recruits</h1>
                                            <h1 className="divBody">{stats.recruits}</h1>
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
                            <Chart options={lineChart.options} series={lineChart.series} type="line" height={500} />
                        </div>
                    </div>
                    <div className="chartBody2">
                        <div className="div4">
                            <div style={{
                                display: 'flex'
                            }}>
                                <ButtonGroup>
                                    <Button>Top 10</Button>
                                    <Button>Bottom 10</Button>
                                </ButtonGroup>
                            </div>
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