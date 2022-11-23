import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import FeatureBar from '../FeatureBar';
import GenreList from '../Genre/GenreList';
import FilmItem from '../Film/FilmItem';
import { Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './CategoryResult.scss';
const theme = createTheme({
    palette: {
        neutral: {
            main: '#fff',
            contrastText: '#fff',
        },
    },
});
class CategoryResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrFilm: [],
            currentGenreId: -1,
            page: 1,
            count: 0,
            pageSize: 32,
            currentPage: 0,
            featureName: ''
        };
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let { page, pageSize } = this.state
            let params = this.getRequestParams(page, pageSize)
            this.setState({ currentGenreId: id, });
            await this.props.getFilmByGenreStart(id, params.page, params.size);
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevState.page !== this.state.page) {
            let id = this.props.match.params.id
            let { cateData } = this.props;
            let { page, pageSize } = this.state;
            let params = this.getRequestParams(page, pageSize);
            await this.props.getFilmByGenreStart(id, params.page, params.size);
            this.setState({
                arrFilm: cateData.films[0].filmsData,
                count: cateData.totalPages,
                currentPage: cateData.currentPage + 1,
                featureName: cateData.films.value,
            });
        } if (prevProps.cateData !== this.props.cateData) {
            let { cateData } = this.props;
            this.setState({
                arrFilm: cateData.films[0].filmsData,
                count: cateData.totalPages,
                currentPage: cateData.currentPage + 1,
                featureName: cateData.films[0].value,
            })
        }
    }
    getRequestParams = (page, pageSize) => {
        let params = {};
        if (page) {
            params.page = page - 1;
        }
        if (pageSize) {
            params.size = pageSize;
        }
        return params;
    };
    handlePageChange = (event, value) => {
        this.setState({ page: value });
    }
    render() {
        console.log('check param', this.state);
        const { count, page, arrFilm,currentPage,featureName } = this.state;
        return (
            <>
                <HomeHeader />
                <FeatureBar
                    text={`Phim ${featureName} Trang ${currentPage}`}
                />
                <div className="category-result-container">
                    <div className="list-film">
                        {
                            arrFilm && arrFilm.length > 0 &&
                            arrFilm.map((item) => {
                                return (
                                    <FilmItem
                                        itemPage={'item-page'}
                                        film={item}
                                    />
                                )
                            })
                        }
                    </div>
                    <ThemeProvider theme={theme}>
                        <Pagination
                            className="pagination-container my-3"
                            count={count}
                            page={page}
                            siblingCount={0}
                            boundaryCount={2}
                            variant="outlined"
                            shape="rounded"
                            color="neutral"
                            onChange={this.handlePageChange}
                            showFirstButton
                            showLastButton
                        />
                    </ThemeProvider>
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        cateData: state.admin.cateData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getFilmByGenreStart: (genre, page, pageSize) => dispatch(actions.getFilmByGenreStart(genre, page, pageSize)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryResult);
