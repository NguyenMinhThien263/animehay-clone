import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './GenreItem.scss';
import { withRouter } from 'react-router';
class GenreItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

    }
    handleOnClickCatePage = (id) => {
        if (this.props.history) {
            this.props.history.push(`/category/${id}`);
        }
    }

    render() {
        const { keyMap, value } = this.props;
        return (
            <div className="genre-item-container"
                onClick={() => this.handleOnClickCatePage(keyMap)}
            >
                <div className="genre-item-value">{value}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenreItem));
