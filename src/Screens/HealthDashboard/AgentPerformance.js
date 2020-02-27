import React from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import Chart from 'react-apexcharts'
import { Button, Skeleton } from 'antd';

const ButtonGroup = Button.Group;

class AgentPerformance extends React.Component {

    constructor(props) {
        super(props)
    }



    render() {
        const { loadingChart, AgentChart, updateData, updateData1 } = this.props
        return (
            <div className="chartBody2">
                <div className="div4">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <ButtonGroup>
                            <Button onClick={(e) => updateData(e.target)} className="btn-group1" id="top10">Top 10</Button>
                            <Button id="bottom10" onClick={(e) => updateData(e.target)}>Bottom 10</Button>
                        </ButtonGroup>
                        <h4>Agent Performance</h4>
                        <ButtonGroup>
                            <Button className="btn-group1" id="volume" onClick={(e) => updateData1(e.target)}>Sales Volume</Button>
                            <Button id="amount" onClick={(e) => updateData1(e.target)}>Sales Amount</Button>
                            <Button id="recruits" onClick={(e) => updateData1(e.target)}>Recruits</Button>
                        </ButtonGroup>
                    </div>
                    {loadingChart ? <Chart options={AgentChart.options} series={AgentChart.series} type="bar" height={270} /> : <Skeleton />}
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

export default connect(mapStateToProps, mapDispatchToProps)(AgentPerformance)