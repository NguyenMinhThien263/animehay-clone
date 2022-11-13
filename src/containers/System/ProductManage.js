import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from "../../store/actions";
class ProductManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedGenre: '', allGenre: [],
        }
    }

    componentDidMount() {
        this.props.getAllcodeByTypeStart();
    }
    handleSelectedMultiple = (selectedGenre) => {
        console.log('check multi select', selectedGenre);
        this.setState({ selectedGenre });
    };
    buildAllCodeData = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.value = item.keyMap;
                object.label = item.value;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.allCodeData.genreData !== this.props.allCodeData.genreData) {
            this.setState({ allGenre: this.buildAllCodeData(this.props.allCodeData.genreData), });
        }
      
    }

    render() {

        return (
            <Select
                isMulti
                value={this.state.selectedGenre}
                options={this.state.allGenre}
                onChange={this.handleSelectedMultiple}
            />
        )
    }

}

const mapStateToProps = state => {
    return {
        allCodeData: state.admin.allCodeData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllcodeByTypeStart: () => dispatch(actions.getAllcodeByTypeStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
