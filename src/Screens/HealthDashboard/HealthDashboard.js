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
            SaleAmountChart: {
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
                    name: 'Revenue',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }]
            },
            lineChart: {
                series: [{
                    name: 'Revenue',
                    type: 'column',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }, {
                    name: 'Deals',
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
            AgentChart: {
                series: [{
                    data: []
                }],
                options: {
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
                        categories: [],
                    }
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
            },
            dashData: [],
            loadingChart: true,
            currentTop: "top10",
            currentVal: "volume"
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
        var saleAmount = { ...this.state.SaleAmountChart }
        var AgentData = { ...this.state.AgentChart }
        var sortableId = []
        var sortableVal = []
        var month = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0 }
        var monthLine = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0 }
        var obj = { "Buy": 0, "Sell": 0, "Rental": 0, "Whole": 0, "Referral": 0 }
        var arr = []
        var allObj = {}
        axios.post('https://wsr-hermes-server.herokuapp.com/admin/getAll', {
            startDate: startDate.toArray(),
            endDate: endDate.toArray()
        })
            .then((res) => {
                var { data } = res
                if (data.success) {
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
                            if (!allObj[i.agentId]) {
                                allObj[i.agentId] = 0
                            }
                            month[moment(i.timestamp).month()] += i.paidAmount
                            monthLine[moment(i.timestamp).month()] += 1
                            topData.netRevenue += i.paidAmount
                            topData.salesPerDeal += i.soldPrice
                            obj[i.saleType] += i.paidAmount
                            allObj[i.agentId] += 1
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
                        lineData.series[0].data = Object.entries(month).map(v => v[1])
                        lineData.series[1].data = Object.entries(monthLine).map(v => v[1])
                        saleAmount.series[0].data = Object.entries(month).map(v => v[1])
                        histData.series[0].data = Object.entries(saleObj).map(v => v[1])
                        var sortable = [];
                        for (var vehicle in allObj) {
                            sortable.push([vehicle, allObj[vehicle]]);
                        }

                        sortable.sort((a, b) => {
                            return a[1] - b[1];
                        }).reverse()

                        sortableId = sortable.map(v => v[0])
                        sortableVal = sortable.map(v => v[1])
                    }
                    for (var j in obj) {
                        arr.push(obj[j])
                    }
                    this.setState({
                        topData: topData, saleTypeChart: {
                            ...this.state.saleTypeChart, series: arr
                        }, salePriceHist: histData, lineChart: lineData,
                        SaleAmountChart: saleAmount,
                        dashData: data.data
                    })
                }

                axios.get('https://wsr-hermes-server.herokuapp.com/admin/getusers')
                    .then((res) => {
                        var { data } = res.data
                        var sortableName = []
                        topData.activeAgent = data.length
                        this.setState({ allData: data, topData: topData }, () => {
                            var { allData, stats } = this.state
                            for (var k of sortableId) {
                                console.log('k', k)
                                for (var d of allData) {
                                    if (d._id === k) {
                                        sortableName.push(d.fname)
                                    }
                                }
                            }
                            AgentData.series[0].data = sortableVal.length > 10 ? sortableVal.slice(0, 10) : sortableVal
                            AgentData.options.xaxis.categories = sortableName.length > 10 ? sortableName.slice(0, 10) : sortableName
                            axios.post(`https://wsr-hermes-server.herokuapp.com/admin/get-user/${allData[0]._id}`, {
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
                                        AgentChart: AgentData,
                                        loading: true
                                    }, () => {
                                        document.getElementById("top10").className = "ant-btn btn-group"
                                    })
                                })
                        })
                    })
                    .catch((err) => console.log(err))
            })
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
        await axios.post(`https://wsr-hermes-server.herokuapp.com/admin/get-user/${id}`, {
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
        const { StartDateValue, endDate, allData } = this.state
        this.setState({ loading: false })
        var topData = { ...this.state.topData }
        var histData = { ...this.state.salePriceHist }
        var obj = { "Buy": 0, "Sell": 0, "Rental": 0, "Whole": 0, "Referral": 0 }
        var arr = []
        var lineData = { ...this.state.lineChart }
        var saleAmount = { ...this.state.SaleAmountChart }
        var AgentData = { ...this.state.AgentChart }
        var sortableId = []
        var sortableVal = []
        var allObj = {}
        var sortableName = []
        var month = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0 }
        var monthLine = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0 }
        axios.post('https://wsr-hermes-server.herokuapp.com/admin/getAll', {
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
                            if (!allObj[i.agentId]) {
                                allObj[i.agentId] = 0
                            }
                            month[moment(i.timestamp).month()] += i.paidAmount
                            monthLine[moment(i.timestamp).month()] += 1
                            console.log(i.paidAmount)
                            topData.netRevenue += i.paidAmount
                            topData.salesPerDeal += i.soldPrice
                            obj[i.saleType] += i.paidAmount
                            allObj[i.agentId] += 1
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
                        lineData.series[0].data = Object.entries(month).map(v => v[1])
                        lineData.series[1].data = Object.entries(monthLine).map(v => v[1])
                        saleAmount.series[0].data = Object.entries(month).map(v => v[1])
                        histData.series[0].data = Object.entries(saleObj).map(v => v[1])

                        var sortable = [];
                        for (var vehicle in allObj) {
                            sortable.push([vehicle, allObj[vehicle]]);
                        }

                        sortable.sort((a, b) => {
                            return a[1] - b[1];
                        }).reverse()

                        sortableId = sortable.map(v => v[0])
                        sortableVal = sortable.map(v => v[1])

                        for (var k of sortableId) {
                            console.log('k', k)
                            for (var d of allData) {
                                if (d._id === k) {
                                    sortableName.push(d.fname)
                                }
                            }
                        }
                        AgentData.series[0].data = sortableVal.length > 10 ? sortableVal.slice(0, 10) : sortableVal
                        AgentData.options.xaxis.categories = sortableName.length > 10 ? sortableName.slice(0, 10) : sortableName
                    }
                    for (var j in obj) {
                        arr.push(obj[j])
                    }
                    this.setState({
                        loading: true, topData: topData, saleTypeChart: {
                            ...this.state.saleTypeChart, series: arr
                        }, salePriceHist: histData, lineChart: lineData,
                        SaleAmountChart: saleAmount, AgentChart: AgentData,
                        dashData: data.data
                    })
                }

            })
    }

    updateData(e) {
        const { dashData, allData, AgentChart, currentVal } = this.state
        var AgentData = { ...AgentChart }
        var sortableId = []
        var sortableVal = []
        var allObj = {}
        var sortableName = []
        var ids = ["top10", "bottom10"]
        this.setState({
            loadingChart: false
        }, () => {
            for (var i of ids) {
                if (i === e.id) {
                    document.getElementById(e.id).className = "ant-btn btn-group"
                }
                else {
                    document.getElementById(i).className = "ant-btn"
                }
            }

            for (var j of dashData) {
                if (!allObj[j.agentId]) {
                    allObj[j.agentId] = 0
                }

                if (currentVal === "volume") {
                    allObj[j.agentId] += 1
                }
                else if (currentVal === "amount") {
                    allObj[j.agentId] += j.soldPrice
                }
                else{
                    allObj[j.agentId] += 1
                }
            }

            var sortable = [];
            for (var vehicle in allObj) {
                sortable.push([vehicle, allObj[vehicle]]);
            }

            if (e.id === "top10") {
                sortable.sort((a, b) => {
                    return a[1] - b[1];
                }).reverse()
            }

            else {
                sortable.sort((a, b) => {
                    return a[1] - b[1];
                })
            }

            sortableId = sortable.map(v => v[0])
            sortableVal = sortable.map(v => v[1])

            for (var k of sortableId) {
                for (var d of allData) {
                    if (d._id === k) {
                        sortableName.push(d.fname)
                    }
                }
            }
            AgentData.series[0].data = sortableVal.length > 10 ? sortableVal.slice(0, 10) : sortableVal
            AgentData.options.xaxis.categories = sortableName.length > 10 ? sortableName.slice(0, 10) : sortableName

            this.setState({
                AgentChart: AgentData,
                loadingChart: true,
                currentTop: e.id
            })
        })
    }

    updateData1(e) {
        var ids = ["volume", "amount", "recruits"]
        const { dashData, allData, AgentChart, currentTop } = this.state
        var AgentData = { ...AgentChart }
        var sortableId = []
        var sortableVal = []
        var allObj = {}
        var sortableName = []

        this.setState({
            loadingChart: false
        }, () => {
            for (var i of ids) {
                if (i === e.id) {
                    document.getElementById(e.id).className = "ant-btn btn-group"
                }
                else {
                    document.getElementById(i).className = "ant-btn"
                }
            }

            for (var j of dashData) {
                if (!allObj[j.agentId]) {
                    allObj[j.agentId] = 0
                }

                console.log(j)
                if (e.id === "volume") {
                    allObj[j.agentId] += 1
                }
                else if (e.id === "amount") {
                    allObj[j.agentId] += j.soldPrice
                }
                else{
                    allObj[j.agentId] += 1
                }
            }


            var sortable = [];
            for (var vehicle in allObj) {
                sortable.push([vehicle, allObj[vehicle]]);
            }

            if (currentTop === "top10") {
                sortable.sort((a, b) => {
                    return a[1] - b[1];
                }).reverse()
            }

            else {
                sortable.sort((a, b) => {
                    return a[1] - b[1];
                })
            }

            sortableId = sortable.map(v => v[0])
            sortableVal = sortable.map(v => v[1])

            for (var k of sortableId) {
                for (var d of allData) {
                    if (d._id === k) {
                        sortableName.push(d.fname)
                    }
                }
            }
            AgentData.series[0].data = sortableVal.length > 10 ? sortableVal.slice(0, 10) : sortableVal
            AgentData.options.xaxis.categories = sortableName.length > 10 ? sortableName.slice(0, 10) : sortableName

            this.setState({
                AgentChart: AgentData,
                loadingChart: true,
                currentVal: e.id
            })

        })
    }


    render() {
        const { allData, currentAgent, stats, startDate, loading, topData, saleTypeChart, salePriceHist, lineChart, SaleAmountChart, AgentChart, loadingChart } = this.state
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
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <ButtonGroup>
                                    <Button onClick={(e) => this.updateData(e.target)} id="top10">Top 10</Button>
                                    <Button id="bottom10" onClick={(e) => this.updateData(e.target)}>Bottom 10</Button>
                                </ButtonGroup>
                                <h4>Agent Performance</h4>
                                <ButtonGroup>
                                    <Button className="btn-group1" id="volume" onClick={(e) => this.updateData1(e.target)}>Sales Volume</Button>
                                    <Button id="amount" onClick={(e) => this.updateData1(e.target)}>Sales Amount</Button>
                                    <Button id="recruits" onClick={(e) => this.updateData1(e.target)}>Recruits</Button>
                                </ButtonGroup>
                            </div>
                            {loadingChart ? <Chart options={AgentChart.options} series={AgentChart.series} type="bar" height={270} /> : <Skeleton />}
                        </div>
                        <div className="div5">
                            <Chart options={SaleAmountChart.options} series={SaleAmountChart.series} type="bar" height={300} />
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