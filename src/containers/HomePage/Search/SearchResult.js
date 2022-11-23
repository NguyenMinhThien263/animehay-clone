import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './SearchResult.scss';
class SearchResult extends Component {
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
        let { filmData } = this.props;
        return (
            <div className="search-result-container">
                {filmData && filmData.length > 0 ?
                    <div className="search-result-content">
                        {filmData.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                            }
                            return (
                                <div className="search-result-item">
                                    <div className="image-container">
                                        <div className="image"
                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                        ></div>
                                    </div>
                                    <div className="detail">
                                        <div className="title">{item.title}</div>
                                        <div className="total-ops">{item.totalEpisode}/Tập</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    : ''
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
