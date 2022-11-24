import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './FilmItem.scss';
import { withRouter } from 'react-router';
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
    handleOnLinkFilm = (film) => {
        if (this.props.history) {
            this.props.history.push(`/info-film/${film.title}-${film.id}`);
        }
    }
    render() {
        const { itemPage, film } = this.props;
        let imageBase64 = '';
        if (film.image) {
            imageBase64 = Buffer.from(film.image, 'base64').toString('binary');
        }
        return (
            <div className={`film-item ${itemPage ? 'item-page' : ''}`}
                onClick={() => this.handleOnLinkFilm(film)}
            >
                <div className="image-film"
                    style={{ backgroundImage: `url(${imageBase64})` }}
                ></div>
                <div className="text-film"><span>{film.title}</span></div>
                <div className="eps-film">{film.totalEpisode} Tập</div>
                <div className="score-film">{film.scrores}/10</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilmItem));
