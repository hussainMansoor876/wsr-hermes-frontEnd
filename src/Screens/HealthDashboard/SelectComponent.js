import React from 'react';
import { loginUser } from '../../Redux/actions/authActions'
import { connect } from 'react-redux';
import Chart from 'react-apexcharts'
import { Select } from 'antd';

const { Option } = Select

class AgentPerformance extends React.Component {

    constructor(props) {
        super(props)
    }



    render() {
        const { startYear, update, yearsData } = this.props
        return (
            <Select
                showSearch
                style={{ width: 120 }}
                defaultValue={startYear}
                placeholder="Select Year"
                onChange={(e) => update(e)}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {Object.keys(yearsData).map((v, i) => {
                    return <Option value={v} key={i}>{v}</Option>
                })
                }
            </Select>
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