import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './FilmItem.scss';
class FilmItem extends Component {
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

    render() {
        const {itemPage} = this.props;
        return (
            <div className={`film-item ${itemPage?'item-page':''}`}>
                <div className="image-film"></div>
                <div className="text-film"><span>Berserk</span></div>
                <div className="eps-film">9/??</div>
                <div className="score-film">9.8/10</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FilmItem);
