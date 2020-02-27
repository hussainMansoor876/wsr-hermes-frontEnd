import React, { Component } from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import { Select } from 'antd';

const { Option } = Select;

class AgentSummary extends React.Component {

    constructor(props) {
        super(props)
    }



    render() {
        const { getUpdate, allData, stats } = this.props
        return (
            <div className="chart4 mLeft">
                <h1 className="heading2">Agent Summary</h1>
                <div className="select1">
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        defaultValue={allData && allData[0].fname}
                        optionFilterProp="children"
                        onChange={(e) => getUpdate(e)}
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
                            <h1 className="divBody">${stats.sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                        </div>
                        <div className="div3">
                            <h1 className="divBody">WSR Revenue</h1>
                            <h1 className="divBody">${stats.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                        </div>
                    </div>
                    <div className="div6">
                        <div className="div3">
                            <h1 className="divBody">Commission</h1>
                            <h1 className="divBody">${stats.commission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
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