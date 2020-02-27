import moment from 'moment';
const allState = {
    saleTypeChart: {
        series: [0, 0, 0, 0, 0],
        options: {
            chart: {
                width: '100%',
                type: 'pie',
            },
            labels: ["Buy", "Sell", "Rental", "Whole", "Referral"],
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
    currentVal: "volume",
    loadingData: true,
    yearsData: {},
    loadingLineChart: false,
    loadingSaleChart: false
}

export default allState